---
title: "How to Write AI Skills: Teaching an AI to Work the Way You Do"
description: "Prompts are throwaway. Skills are playbooks an AI loads when it needs them. Here's how skills work, how I write them for creative and growth work, and the mistakes to avoid."
pubDate: "2026-11-07"
heroImage: "/images/blog/how-to-write-ai-skills-for-marketing/cover.webp"
lang: "en"
---

The biggest jump in quality I've had from AI didn't come from a new model. It came from writing **skills**.

A prompt is something you type once. A skill is a written playbook the AI can find and follow every time a certain kind of task comes up. My creative workflow runs on more than twenty of them: one for breaking down competitor ads, one for writing hooks, one for turning a winning image into variations, one for reading test results, one for writing creator briefs, and so on.

This post explains what skills are, how they work under the hood, and how I write them for marketing work, with the mistakes I made along the way.

## Prompts vs. skills

Most marketing teams start with a prompt library: a doc full of "good prompts" people copy and paste. It helps for a while, then it decays. Nobody knows which version is current, prompts get tweaked in private, and the AI still has to be re-taught your context every time.

A skill is different in three ways:

1. **It's loaded automatically** when the task matches, so nobody has to remember to paste it.
2. **It can be much bigger than a prompt**, because only the relevant parts are loaded when they're needed.
3. **It's a file you version and improve**, like code, so the whole team's work gets better every time someone fixes it.

## How skills work under the hood

Anthropic introduced Agent Skills in October 2025 and describes them as "organized folders of instructions, scripts, and resources that agents can discover and load dynamically" ([Anthropic Engineering](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)). Their comparison is a good one: a skill is like an onboarding guide you'd give a new hire.

The structure is simple:

```
hook-writer/
├── SKILL.md          ← the playbook (required)
├── frameworks.md     ← detailed reference, loaded only if needed
├── examples.md       ← good and bad examples
└── check_length.py   ← a script the AI can run
```

`SKILL.md` starts with a small header containing a **name** and a **description**. The rest is plain instructions.

The clever part is what Anthropic calls **progressive disclosure**, which they describe as "the core design principle that makes Agent Skills flexible and scalable":

1. **Level 1, metadata.** The name and description of every installed skill are always visible to the AI, so it knows what skills exist and when each one is relevant.
2. **Level 2, the playbook.** When a task matches, the AI reads the full `SKILL.md`.
3. **Level 3, linked files.** Reference files, examples and scripts are only opened when the playbook points to them and the task needs them.

Because of this, a skill can hold a lot of knowledge without filling up the AI's context on every task. Scripts can even run without their code being loaded into the conversation at all.

## How I write a skill

### 1. Start from a real failure

Anthropic's first recommendation is to "start with evaluation": run the AI on real tasks, see where it struggles, and build skills to fill those gaps. That matches my experience exactly.

I never write a skill from a blank page. I write one when I notice I'm correcting the AI on the same thing for the third time. My hook-writer skill exists because generic AI hooks kept opening with "Are you tired of…". My brand skill exists because an AI once put the wrong price in an ad.

### 2. Write the description like a trigger

The description decides *when* the skill is used, so it's the most important line in the file. Anthropic specifically advises paying close attention to the name and description.

A weak description: *"Helps with hooks."*

A strong one: *"Generates scroll-stopping opening lines and physical openers for TikTok, Reels and UGC ads. Use whenever the user asks for hooks, opening lines, first three seconds, or is writing an ad script or creator brief."*

Say what it does, and list the actual words people use when they need it.

### 3. Encode decisions, not adjectives

"Write engaging, on-brand copy" teaches nothing. Every model already thinks it's doing that. Useful skills contain the decisions you make as an expert:

- *"Every hook in a batch must use a different mechanic: confession, question, hot take, demo, mini story or warning."*
- *"Never open with a question that can be answered 'no'."*
- *"If the ad mentions a price, it must come from facts.md. If it isn't there, don't write it."*

If you can't write a rule as a clear yes/no check, it probably isn't a rule yet.

### 4. Show good and bad examples

Models learn tone and quality bar much faster from examples than from descriptions. I keep a short list of winning outputs and a list of rejected ones with one line on why each was rejected. The rejected list is often more useful.

### 5. Split knowledge into files

When `SKILL.md` grows, Anthropic recommends splitting it into separate files and keeping contexts that are rarely used together apart. My rule of thumb: `SKILL.md` is the table of contents and the non-negotiable rules. Long frameworks, examples and reference data live in their own files, and the playbook says when to open them.

For marketing, the most important separate file is the **fact sheet**: prices, offers, claims you're allowed to make, markets you operate in. One source of truth, referenced by every skill that writes copy.

### 6. Use scripts for anything that must be exact

Some things shouldn't be left to judgement. Anthropic notes that code is deterministic and efficient for operations like sorting or extracting data. In my skills, scripts check caption length, validate that every claim matches the fact sheet, resize images to 9:16, 1:1 and 4:5, and generate file names by our naming rules. The AI decides *what* to make. Scripts make sure the boring parts are always right.

### 7. Turn every correction into a rule

This is the habit that compounds. Whenever I correct an output, I ask: would this mistake happen again? If yes, the fix goes into the skill as a rule. Anthropic suggests the same thing: ask the AI to capture successful approaches and common mistakes back into the skill.

After a few months, a skill isn't a prompt anymore. It's your accumulated taste, written down.

### 8. Chain skills into workflows

Single skills are useful. Skills that hand off to each other are where it gets powerful. My weekly creative testing run is one orchestrating skill that calls others in order: read last week's test, write new hooks for the winners, generate image variations, script avatar clips, check facts and brand, then write the report. Each step does one job well.

## Mistakes I made

- **Writing one giant skill.** It triggered for everything and was mediocre at all of it. Small, focused skills with sharp descriptions work better.
- **Vague descriptions.** If the skill doesn't trigger, it doesn't exist.
- **No fact sheet.** Every copy skill invented its own version of the product.
- **Never pruning.** Old rules that no longer apply confuse the model. Review skills like you review code.
- **Installing other people's skills blindly.** Skills can contain instructions and code. Anthropic's own advice is to install skills only from trusted sources and audit anything else, especially scripts and anything that connects to outside services.

## Where to start

Pick the task you correct the AI on most often. Write down:

1. A description with the words you actually use for that task.
2. Five rules you'd tell a new hire on their first day.
3. Three good examples and three bad ones with a reason.
4. Your fact sheet, if the task involves claims.

Use it for a week. Every time it gets something wrong, add a rule. That's it. That's how you teach an AI to work the way you do.

---

*Skills are the engine underneath my [AI Creative Machine](/creative-ops): 20+ of them, each one a playbook for a single creative or growth job.*

**Sources**

- Anthropic Engineering, [Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills), October 16, 2025.
- Anthropic, [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices).
