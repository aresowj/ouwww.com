---
title: "What a Coding-Agent Benchmark Taught Me About Local and Cloud Models"
description: "I ran six identical autonomous coding tasks across local and cloud models. Every serious model passed, but their efficiency—and the meaning of fast inference—was very different."
date: 2026-09-11T12:00:00.000Z
year: "2026"
month: "09"
day: "11"
routeSlug: "coding-agent-benchmark-local-cloud-models"
categories: ["Tech", "ai", "coding agents", "llama.cpp", "local llm", "benchmarking"]
cover: "/images/covers/llama-coding-agent.png"
coverAlt: "A thoughtful llama working at a laptop beside a desktop GPU"
toc: true
---

<p>I have been experimenting with replacing part of my local coding-agent setup with cloud models, so I built a reproducible benchmark and ran the same six autonomous coding tasks across several models.</p>

<p>This is not a benchmark of raw model intelligence in the abstract. It is a benchmark of complete coding-agent runs: the model received a repository, a task, tools, and a starting state, then had to investigate, make changes, and finish without human steering.</p>

<h2>The local baseline</h2>

<p>My local baseline was Qwen3.8-27B running on an RTX 4080. The model was aggressively optimized to fit and run quickly on a single 16 GB GPU.</p>

<ul>
<li>Intel Core Ultra 7 265K</li>
<li>NVIDIA RTX 4080 16 GB</li>
<li>96 GB system RAM</li>
<li>Gigabyte Z890 AORUS ELITE WIFI7</li>
<li>850 W PSU</li>
</ul>

<p>The actual llama.cpp configuration was:</p>

<pre><code>[qwen3.8-27b]
chat-template-kwargs = {"reasoning_effort":"medium", "preserve_thinking":true, "reasoning_budget":8192}
reasoning-budget = 8192

load-on-startup = true

model = C:/llm/models/Qwen/Qwen3.8-27B/Qwen3.8-27B-GSQ-RCO-IQ3_S-mtp.gguf

cache-type-k = q8_0
cache-type-v = q8_0

main-gpu = 0
split-mode = none

fit = on
fit-ctx = 65536

spec-type = draft-mtp
spec-draft-n-max = 4
spec-draft-p-min = 0.8</code></pre>

<p>So this was not Qwen3.8-27B at BF16, FP8, or even Q6. It was an IQ3_S / GSQ-RCO quantized model running entirely on one RTX 4080, with a 65,536-token context, Q8 KV cache, an 8K reasoning budget, MTP speculative decoding, no multi-GPU split, and llama.cpp automatic fitting enabled.</p>

<p>Depending on the prompt and speculative acceptance rate, generation speeds could approach <strong>80 tokens per second</strong>. That made this a fairly aggressive test of how much useful coding capability survives when a modern 27B model is squeezed into 16 GB of VRAM.</p>

<h2>The models</h2>

<p>I compared the local model with:</p>

<ul>
<li>GPT-5.6 Luna Max</li>
<li>GPT-5.6 Terra Medium</li>
<li>Claude Sonnet 5</li>
<li>GLM-5.3</li>
<li>DeepSeek V4.1 Flash</li>
<li>Local Qwen3.8-27B IQ3_S</li>
</ul>

<p>Each model received the same starting repository, task prompt, and tools. There was no human steering after a run started. Hidden tests were executed only after the agent stopped.</p>

<h2>The benchmark</h2>

<p>The six cases were designed to exercise different coding-agent abilities:</p>

<ol>
<li>Configuration propagation across multiple layers</li>
<li>An overnight time-range edge-case bug</li>
<li>A retry/idempotency bug causing duplicate delivery</li>
<li>A cross-cutting retry abstraction and refactor</li>
<li>Algorithmic performance optimization</li>
<li>A SQLite concurrent job-claiming race</li>
</ol>

<p>The biggest result was also the biggest limitation:</p>

<p><strong>Every serious model passed all six cases.</strong></p>

<p>That means this benchmark has a ceiling effect. It tells me a lot about efficiency and agent behavior, but it does not yet establish a meaningful capability ranking. I need harder tasks before claiming that one model is more capable than another.</p>

<table>
<thead><tr><th>Model</th><th>Pass</th><th>Total time</th><th>Output tokens</th><th>Tool calls</th><th>API cost</th></tr></thead>
<tbody>
<tr><td>Claude Sonnet 5</td><td>6/6</td><td>~352s</td><td>28.5K</td><td>78</td><td>~$0.66</td></tr>
<tr><td>GPT-5.6 Luna Max</td><td>6/6</td><td>~380s</td><td><strong>14.0K</strong></td><td>86</td><td><strong>~$0.04</strong></td></tr>
<tr><td>GPT-5.6 Terra Medium</td><td>6/6</td><td>~384s</td><td>16.4K</td><td>84</td><td>~$0.45</td></tr>
<tr><td>GLM-5.3</td><td>6/6*</td><td>~374s</td><td>39.8K</td><td>—</td><td>~$0.42</td></tr>
<tr><td>Local Qwen IQ3_S</td><td>6/6</td><td>~1,146s</td><td>45.4K</td><td>107</td><td>$0 API</td></tr>
<tr><td>DeepSeek V4.1 Flash</td><td>6/6</td><td>~1,184s</td><td>56.9K</td><td>150</td><td>~$0.07</td></tr>
</tbody>
</table>

<p><small>* GLM encountered one provider-side 429 during an initial run. The generated code passed the tests, and clean reruns succeeded.</small></p>

<h2>1. The local Q3 model did much better than I expected</h2>

<p>I expected the combination of a 27B model, roughly 3-bit weights, only 16 GB of VRAM, a large 65K context, and speculative decoding to show obvious reasoning degradation on architecture or concurrency tasks.</p>

<p>It did not.</p>

<p>The local model successfully solved the SQLite race condition, the retry/idempotency bug, the abstraction refactor, and the performance optimization. That does not prove IQ3_S is equivalent to a full-precision model. It means only that these six tasks were not difficult enough to expose the difference.</p>

<p>Still, the result makes me less interested in buying additional GPUs simply because I assumed Q3 quantization was too compromised for serious coding work.</p>

<h2>2. 80 tokens per second does not mean the agent is faster</h2>

<p>This was the most useful result.</p>

<p>The local model could reach around <strong>80 generated tokens per second</strong> under favorable conditions. Yet complete agent runs took roughly three times as long as Luna, Terra, Claude, and GLM.</p>

<p>The reason is that the stronger models often needed dramatically fewer tokens and fewer interactions to reach the same result. In the concurrency case:</p>

<ul>
<li>Local Qwen: ~356 seconds and ~15.8K output tokens</li>
<li>Claude: ~63 seconds</li>
<li>Luna: ~71 seconds and ~3.2K output tokens</li>
<li>Terra: ~82 seconds and ~3.8K output tokens</li>
</ul>

<p>All of them solved it. The local model was generating tokens quickly; it just needed far more of them.</p>

<p>For coding agents, I think the more meaningful metric is <strong>successful tasks per hour</strong>, not tokens per second.</p>

<h2>3. Luna was the standout value result</h2>

<p>Luna was nearly as fast as Claude, in roughly the same overall range as Terra and GLM, and produced dramatically less output than almost everything else.</p>

<ul>
<li>Luna: ~14K output tokens</li>
<li>Terra: ~16K</li>
<li>Claude: ~28K</li>
<li>Local Qwen: ~45K</li>
<li>DeepSeek: ~57K</li>
</ul>

<p>The measured API-equivalent cost for Luna was around <strong>$0.04 for all six tasks</strong>. More importantly for me, I already pay for ChatGPT Plus/Codex. While I am within the included Codex allowance, Luna’s marginal cost is effectively zero.</p>

<p>For now, that makes it look like an unusually strong default coding-agent model.</p>

<h2>4. Claude Sonnet was excellent</h2>

<p>Claude Sonnet 5 was the fastest overall model in this run and used the fewest tool calls. It behaved decisively and had no obvious weak case.</p>

<p>But on this benchmark it was only about 7% faster than Luna while costing substantially more. That does not mean Claude is not stronger. The problem is that everything went 6/6. I need harder cases where Luna starts failing before I can determine whether Claude’s higher cost buys meaningfully higher autonomous success.</p>

<h2>5. DeepSeek was cheap, but slow in my harness</h2>

<p>DeepSeek V4.1 Flash was correct, but surprisingly verbose and interaction-heavy:</p>

<ul>
<li>~57K output tokens</li>
<li>150 tool calls</li>
<li>~1,184 seconds total</li>
</ul>

<p>That made it roughly as slow as the local model at completing the actual tasks. Its API cost is tiny, so I can still imagine using it for cheap background or batch agents. I am less interested in using it as my interactive default.</p>

<h2>6. GLM looked fast and capable</h2>

<p>GLM completed the benchmark in roughly the same wall-clock range as Luna, Terra, and Claude. It therefore looks more attractive to me than DeepSeek for interactive work.</p>

<p>I did hit one provider-side 429, though, so provider reliability and routing are part of the comparison too.</p>

<h2>My current routing plan</h2>

<p>After this run, I am leaning toward:</p>

<ul>
<li><strong>Luna as the default</strong></li>
<li><strong>Terra Medium or Claude Sonnet for difficult tasks</strong></li>
<li><strong>Local Qwen for parallel agents, offline/privacy use, or quota fallback</strong></li>
<li><strong>DeepSeek as a cheap background worker</strong></li>
</ul>

<p>I am also keeping the RTX 4080 setup. A 27B IQ3 model that can run at up to 80 tokens per second and still go 6/6 on this benchmark is too useful to throw away simply because cloud models complete complex agent loops faster.</p>

<h2>What does local actually cost?</h2>

<p>The API bill is only one side of the comparison. To estimate the local cost, I used a deliberately simple assumption: the complete computer draws an average of 600 W while the model is actively running, it runs for eight hours every day, and electricity costs $0.15 per kWh. That works out to:</p>

<pre><code>0.6 kW × 8 hours × $0.15 = $0.72 per day
$0.72 × 30 days = $21.60 per month
$0.72 × 365 days = $262.80 per year</code></pre>

<p>This is an estimate, not a wall-meter measurement. The GPU may be busy while the rest of the machine is not, and idle time, cooling, monitor power, and other household electricity are not included. It is also worth separating the marginal cost of using hardware I already own from the cost of buying that hardware.</p>

<table>
<thead><tr><th>Scenario</th><th>Up-front hardware</th><th>Electricity / year</th><th>Three-year monthly cost</th><th>Three-year total</th></tr></thead>
<tbody>
<tr><td>Already own the machine</td><td>$0 incremental</td><td>$262.80</td><td>$21.60</td><td>$788.40</td></tr>
<tr><td>Buy used system</td><td>Assume $1,200</td><td>$262.80</td><td>$55.00</td><td>$1,988.40</td></tr>
<tr><td>Buy new system</td><td>Assume $2,000</td><td>$262.80</td><td>$77.16</td><td>$2,774.40</td></tr>
</tbody>
</table>

<p>The used and new rows are planning assumptions for a complete RTX 4080-class system, not quotes. They amortize the purchase over 36 months and add the electricity cost. If the machine is also used for gaming or ordinary work, only part of that purchase price should really be assigned to the model.</p>

<h3>Comparison with inexpensive APIs</h3>

<p>For a rough throughput comparison, 80 output tokens per second for eight hours is about 2.30 million output tokens per day. Using current standard output prices, that much output would cost approximately:</p>

<table>
<thead><tr><th>Service</th><th>Published output price</th><th>8-hour output equivalent</th><th>30-day equivalent</th></tr></thead>
<tbody>
<tr><td>Local Qwen on the 4080</td><td>Electricity at $0.15/kWh</td><td>$0.72</td><td>$21.60</td></tr>
<tr><td>Gemini 2.5 Flash-Lite</td><td>$0.40 / 1M output tokens</td><td>~$0.92</td><td>~$27.65</td></tr>
<tr><td>DeepSeek V4.1 Flash, off-peak</td><td>$0.60 / 1M output tokens</td><td>~$1.38</td><td>~$41.47</td></tr>
<tr><td>GPT-5 Mini</td><td>$2.00 / 1M output tokens</td><td>~$4.61</td><td>~$138.24</td></tr>
</tbody>
</table>

<p>The API figures exclude input tokens, cached-input charges, and any provider-specific tool fees. DeepSeek’s peak output price is currently $1.20 per million tokens, which would make the same output about $2.76 per day. The price references are <a href="https://ai.google.dev/gemini-api/docs/pricing">Google’s Gemini pricing</a>, <a href="https://api-docs.deepseek.com/quick_start/pricing/">DeepSeek’s pricing page</a>, and <a href="https://developers.openai.com/api/docs/models/gpt-5-mini">OpenAI’s GPT-5 Mini model page</a>; they can change, so this section should be treated as a dated snapshot.</p>

<p>There is an important catch: equal tokens are not equal work. In my benchmark, the local model needed about 45.4K output tokens for six completed tasks, while Luna needed about 14.0K. A cheaper API can still win economically if it reaches a correct result with far fewer tokens and less waiting. Conversely, the already-owned local machine has a very low marginal cost and offers privacy, offline operation, and unlimited parallel use within its hardware limits. My current conclusion is therefore conditional:</p>

<ul>
<li>If I already own the machine, local inference costs roughly $22 per month at this usage level and is easy to justify.</li>
<li>If I must buy a $1,200 used system, a low-cost API can be cheaper until the machine is used heavily or its non-AI value is included.</li>
<li>A new $2,000 system is difficult to justify on electricity savings alone; I would buy it for local control, privacy, availability, or other workloads.</li>
</ul>

<h2>What I want to test next</h2>

<p>The current benchmark is clearly too easy. The next version should include:</p>

<ul>
<li>A much larger unfamiliar repository with 30–50 relevant files</li>
<li>Misleading nearby abstractions</li>
<li>Undocumented invariants that must be inferred from callers and tests</li>
<li>Architectural changes with several superficially valid approaches</li>
<li>Long-horizon tasks requiring 20–40 meaningful tool calls</li>
<li>Multiple test/fix cycles</li>
<li>Bugs where the obvious fix is intentionally wrong</li>
</ul>

<p>That is where I expect to see a meaningful difference between Qwen3.8-27B IQ3 on a 4080 and models like Luna, Terra, and Claude Sonnet.</p>

<p>The biggest takeaway so far is simple:</p>

<p><strong>Raw inference throughput and coding-agent throughput are very different things.</strong></p>

<p>My local model can generate around 80 tokens per second, yet a stronger cloud model can finish an engineering task several times faster simply by generating fewer unnecessary tokens and taking a better path through the problem.</p>
