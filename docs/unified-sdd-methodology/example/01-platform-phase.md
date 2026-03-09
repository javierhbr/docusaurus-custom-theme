---
title: "Example: Platform Phase"
description: "A worked example of how the Platform phase creates durable context before any change package is planned."
slug: "/unified-sdd-methodology/example/platform-phase"
---

# Example: Platform Phase

Use the Platform phase to turn a cross-team idea into durable platform truth. The goal is not to plan the feature yet. The goal is to define the shared rules, references, and boundaries that every later change package will inherit.

| Goal | Primary owner | End state |
| --- | --- | --- |
| Create shared context before change-level work starts | Architect | Baseline, refs, versioning rules, and JIRA conventions |

## Scenario

> The platform wants to support validated customer email updates across `profile-service`, `auth-service`, and `notification-service`. Before any component team writes specs, tasks, or code, the platform needs a durable baseline for customer identity rules, shared contracts, ownership boundaries, and delivery traceability.

## Flow

```text
[Existing platform]
  current repos + contracts + team conventions
        |
        v
[Architect leads Platform]
        |
        +--> BMAD: inspect brownfield architecture and constraints
        +--> OpenSpec: encode durable context and refs
        +--> Speckit: convert principles into explicit rules
        |
        v
[Platform baseline]
  principles + refs + versioning + JIRA conventions
```

Done means Platform leaves behind a reusable baseline:

- The shared rules are explicit enough for other teams to inherit.
- The platform has stable refs, versioning language, and ownership boundaries.
- The next phase can route requests without rediscovering baseline context.

## Architect

The architect owns Platform because this phase is mostly about separating durable truth from temporary delivery detail.

**When to engage**

- At the start of Platform.
- Whenever the baseline is missing, stale, or contradictory.

**Skill sequence**

- `BMAD`
- `OpenSpec`
- `Speckit`
- `Explain Code` when teams need the current architecture explained

**Outputs**

- Platform baseline
- Capability refs and contract refs
- Versioning model and JIRA conventions

Suggested prompts:

1. "Using the BMAD skill, inspect the current customer identity architecture as a brownfield system and list the hard constraints across profile, auth, and notification."
2. "Using the OpenSpec skill, turn those platform constraints into durable context, reusable refs, and versioning rules for the customer-identity capability."
3. "Using the Speckit skill, rewrite the platform principles for customer identity into explicit, testable rules for validation, contracts, observability, and security."

## Product

Product participates in Platform when business context needs to become durable enough to influence every future spec.

**When to engage**

- When durable customer expectations must be recorded early.
- Before detailed feature stories are written in Specify.

**Skill sequence**

- `OpenSpec`
- `Speckit`
- `Explain Code` when current behavior must be clarified for planning

**Outputs**

- Durable business constraints
- Impacted component list
- Platform-level acceptance language

Suggested prompts:

1. "Using the OpenSpec skill, document the durable business context for validated customer email updates, including goals, affected customer journeys, and impacted components."
2. "Using the Speckit skill, convert those business expectations into explicit rules for acceptance, failure behavior, and customer communication."
3. "Using the explain-code skill, explain how email updates behave today and identify the one gap the future feature must close."

## Team Lead

The team lead contributes operational reality so the platform baseline reflects delivery constraints instead of idealized process.

**When to engage**

- When repo boundaries or team ownership affect the baseline.
- When platform-to-component handoffs need to be standardized.

**Skill sequence**

- `BMAD`
- `OpenSpec`
- `Explain Code` when the current handoff flow is unclear

**Outputs**

- Team constraints and adoption notes
- Handoff rules for platform and component work
- Workflow expectations for traceability artifacts

Suggested prompts:

1. "Using the BMAD skill, document the current repo boundaries, team conventions, and delivery constraints that affect profile, auth, and notification."
2. "Using the OpenSpec skill, capture the durable workflow expectations for `platform-ref.yaml`, `jira-traceability.yaml`, and component-level change packages."
3. "Using the explain-code skill, explain the current handoff flow between platform rules, component planning, and PR review, then call out one coordination risk."

## Output target

> Use `platform-repo/platform-baseline.md` as the durable artifact for this phase. It should be concise, versioned, and strong enough that Route and Specify can reuse it without rediscovering platform rules from scratch.
