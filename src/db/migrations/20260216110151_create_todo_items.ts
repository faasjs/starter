import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('todo_items', t => {
    t.bigIncrements('id', { primaryKey: true })
    t.string('title')
    t.string('status')
    t.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('todo_items')
}
