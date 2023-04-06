---
layout: post
title:  "Get ChatGPT to Write Your TypeORM Migration Scripts"
date:   2023-04-06 01:06:00 +0100
categories: typeorm migration chatgpt
published: true
hero: "/images/hero-chatgpt.png"
subtitle: "A Conversation Example"
---

As a developer, writing migration scripts for your TypeORM models can be time-consuming. TypeORM provides the `synchronize: true` option in the configuration, which can automatically generate migrations when developing locally. However, this option is not recommended for use in production environments, where manual migration scripts are preferred.

> **Note**: The `synchronize: true` option in TypeORM configuration can be helpful during local development but is not recommended for production use. In production environments, manually creating migration scripts is the better approach.

Creating manual migration scripts can be tedious, so we turn to AI language models like ChatGPT to help us generate those scripts with ease. In this post, we'll walk through a real example of a conversation with ChatGPT, showcasing how it can generate a TypeORM migration script based on a given model.

![ChatGPT helping a developer with migration scripts](/images/chatgpt-helping-developer.png)

## Problem Description

Suppose we have a TypeORM model called `SampleModel`, with a few columns like `id`, `createdAt`, `type`, `customId`, and `extraInfo`. We want to create a migration script that sets the `customId` field to nullable and adds a new `extraInfo` jsonb field to the table.

## Conversation with ChatGPT

Initially, I asked ChatGPT to generate a migration script for the given model. It provided a script that used the QueryRunner to execute the necessary SQL queries. However, I wanted raw SQL queries instead. After explaining my requirements, ChatGPT provided the following code snippet:

    ALTER TABLE "sample_model" ALTER COLUMN "custom_id" DROP NOT NULL;
    ALTER TABLE "sample_model" ADD COLUMN "extra_info" jsonb DEFAULT 0 NULL;

I then requested that these queries be wrapped in a TypeORM transaction and that each line be executed as a separate query, following our existing migration style. ChatGPT updated the migration script accordingly:

![A generated migration script for a TypeORM model](/images/generated-migration-script.png)

> "By engaging in a conversation with the AI and specifying your requirements, ChatGPT can generate the necessary migration scripts for you."

## Results

The final generated migration script is as follows:

    // UpdateSampleModel163XXXXXXX.ts

    import { MigrationInterface, QueryRunner } from "typeorm";

    export class UpdateSampleModel163XXXXXXX implements MigrationInterface {

        public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.startTransaction();

            try {
                // Make custom_id nullable
                await queryRunner.query(`ALTER TABLE "sample_model" ALTER COLUMN "custom_id" DROP NOT NULL;`);

                // Add extraInfo jsonb field
                await queryRunner.query(`ALTER TABLE "sample_model" ADD COLUMN "extra_info" jsonb DEFAULT 0 NULL;`);

                await queryRunner.commitTransaction();
            } catch (error) {
                await queryRunner.rollbackTransaction();
                throw error;
            }
        }

        public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.startTransaction();

            try {
                // Revert custom_id to not nullable
                await queryRunner.query(`ALTER TABLE "sample_model" ALTER COLUMN "custom_id" SET NOT NULL;`);

                // Remove extraInfo jsonb field
                await queryRunner.query                (`ALTER TABLE "sample_model" DROP COLUMN "extra_info";`);

                await queryRunner.commitTransaction();
            } catch (error) {
                await queryRunner.rollbackTransaction();
                throw error;
            }
        }
    }

## Conclusion

Using AI language models like ChatGPT can save you time and effort when writing migration scripts for your TypeORM models. By engaging in a conversation with the AI and specifying your requirements, ChatGPT can generate the necessary migration scripts for you, which you can then customize further if needed.

However, as showcased in this example, AI-generated outputs might not always be perfect or immediately meet your requirements. It is essential to verify and iterate through the conversation with the AI to obtain the desired output.

With the increasing capabilities of AI language models, developers can streamline their work and focus on more complex tasks, while the AI takes care of the repetitive parts.

## AI Generation

This post was almost entirely AI written. I had the initial conversation, and then asked (in more than a few attempts and tries) to output a blog post based on our conversation. Please enjoy the post!
