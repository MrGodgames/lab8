import express from 'express'
import cors from 'cors'
import pg from 'pg'

const { Pool } = pg
const app = express()

app.use(cors())
app.use(express.json())

const pool = new Pool({
  host: process.env.PGHOST ?? 'localhost',
  user: process.env.PGUSER ?? process.env.USER ?? 'postgres',
  password: process.env.PGPASSWORD ?? '',
  database: process.env.PGDATABASE ?? 'lab8',
  port: Number(process.env.PGPORT ?? 5432),
})

const logDbError = (label, error) => {
  console.error(`DB error [${label}]`, error)
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.get('/api/tech/tovar', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, name, category, price, stock FROM tech_tovar ORDER BY id'
    )
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: 'Ошибка чтения таблицы товаров.' })
  }
})

app.post('/api/tech/tovar', async (req, res) => {
  const { name, category, price, stock } = req.body ?? {}
  if (!name || !category || price === undefined || stock === undefined) {
    return res.status(400).json({ error: 'Нужно заполнить все поля товара.' })
  }

  try {
    const { rows } = await pool.query(
      'INSERT INTO tech_tovar (name, category, price, stock) VALUES ($1, $2, $3, $4) RETURNING id, name, category, price, stock',
      [name, category, price, stock]
    )
    res.status(201).json(rows[0])
  } catch (error) {
    res.status(500).json({ error: 'Ошибка добавления товара.' })
  }
})

app.delete('/api/tech/tovar/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Неверный id товара.' })
  }

  try {
    const result = await pool.query('DELETE FROM tech_tovar WHERE id = $1', [id])
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Товар не найден.' })
    }
    res.json({ ok: true })
  } catch (error) {
    res.status(500).json({ error: 'Ошибка удаления товара.' })
  }
})

app.put('/api/tech/tovar/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { name, category, price, stock } = req.body ?? {}
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Неверный id товара.' })
  }
  if (!name || !category || price === undefined || stock === undefined) {
    return res.status(400).json({ error: 'Нужно заполнить все поля товара.' })
  }

  try {
    const { rows } = await pool.query(
      'UPDATE tech_tovar SET name = $1, category = $2, price = $3, stock = $4 WHERE id = $5 RETURNING id, name, category, price, stock',
      [name, category, price, stock, id]
    )
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Товар не найден.' })
    }
    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ error: 'Ошибка редактирования товара.' })
  }
})

app.get('/api/tech/zakaz', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, customer_name, order_date, total_amount, status FROM tech_zakaz ORDER BY id'
    )
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: 'Ошибка чтения таблицы заказов.' })
  }
})

app.post('/api/tech/zakaz', async (req, res) => {
  const { customer_name, order_date, total_amount, status } = req.body ?? {}
  if (!customer_name || !order_date || total_amount === undefined || !status) {
    return res.status(400).json({ error: 'Нужно заполнить все поля заказа.' })
  }

  try {
    const { rows } = await pool.query(
      'INSERT INTO tech_zakaz (customer_name, order_date, total_amount, status) VALUES ($1, $2, $3, $4) RETURNING id, customer_name, order_date, total_amount, status',
      [customer_name, order_date, total_amount, status]
    )
    res.status(201).json(rows[0])
  } catch (error) {
    res.status(500).json({ error: 'Ошибка добавления заказа.' })
  }
})

app.delete('/api/tech/zakaz/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Неверный id заказа.' })
  }

  try {
    const result = await pool.query('DELETE FROM tech_zakaz WHERE id = $1', [id])
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Заказ не найден.' })
    }
    res.json({ ok: true })
  } catch (error) {
    res.status(500).json({ error: 'Ошибка удаления заказа.' })
  }
})

app.put('/api/tech/zakaz/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { customer_name, order_date, total_amount, status } = req.body ?? {}
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Неверный id заказа.' })
  }
  if (!customer_name || !order_date || total_amount === undefined || !status) {
    return res.status(400).json({ error: 'Нужно заполнить все поля заказа.' })
  }

  try {
    const { rows } = await pool.query(
      'UPDATE tech_zakaz SET customer_name = $1, order_date = $2, total_amount = $3, status = $4 WHERE id = $5 RETURNING id, customer_name, order_date, total_amount, status',
      [customer_name, order_date, total_amount, status, id]
    )
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Заказ не найден.' })
    }
    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ error: 'Ошибка редактирования заказа.' })
  }
})

app.get('/api/tech/sotrud', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, full_name, position, phone, hire_date FROM tech_sotrud ORDER BY id'
    )
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: 'Ошибка чтения таблицы сотрудников.' })
  }
})

app.post('/api/tech/sotrud', async (req, res) => {
  const { full_name, position, phone, hire_date } = req.body ?? {}
  if (!full_name || !position || !phone || !hire_date) {
    return res.status(400).json({ error: 'Нужно заполнить все поля сотрудника.' })
  }

  try {
    const { rows } = await pool.query(
      'INSERT INTO tech_sotrud (full_name, position, phone, hire_date) VALUES ($1, $2, $3, $4) RETURNING id, full_name, position, phone, hire_date',
      [full_name, position, phone, hire_date]
    )
    res.status(201).json(rows[0])
  } catch (error) {
    res.status(500).json({ error: 'Ошибка добавления сотрудника.' })
  }
})

app.delete('/api/tech/sotrud/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Неверный id сотрудника.' })
  }

  try {
    const result = await pool.query('DELETE FROM tech_sotrud WHERE id = $1', [id])
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Сотрудник не найден.' })
    }
    res.json({ ok: true })
  } catch (error) {
    res.status(500).json({ error: 'Ошибка удаления сотрудника.' })
  }
})

app.put('/api/tech/sotrud/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { full_name, position, phone, hire_date } = req.body ?? {}
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Неверный id сотрудника.' })
  }
  if (!full_name || !position || !phone || !hire_date) {
    return res.status(400).json({ error: 'Нужно заполнить все поля сотрудника.' })
  }

  try {
    const { rows } = await pool.query(
      'UPDATE tech_sotrud SET full_name = $1, position = $2, phone = $3, hire_date = $4 WHERE id = $5 RETURNING id, full_name, position, phone, hire_date',
      [full_name, position, phone, hire_date, id]
    )
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Сотрудник не найден.' })
    }
    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ error: 'Ошибка редактирования сотрудника.' })
  }
})

app.get('/api/tech/postavshik', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, company_name, contact_name, phone, city FROM tech_postavshik ORDER BY id'
    )
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: 'Ошибка чтения таблицы поставщиков.' })
  }
})

app.post('/api/tech/postavshik', async (req, res) => {
  const { company_name, contact_name, phone, city } = req.body ?? {}
  if (!company_name || !contact_name || !phone || !city) {
    return res.status(400).json({ error: 'Нужно заполнить все поля поставщика.' })
  }

  try {
    const { rows } = await pool.query(
      'INSERT INTO tech_postavshik (company_name, contact_name, phone, city) VALUES ($1, $2, $3, $4) RETURNING id, company_name, contact_name, phone, city',
      [company_name, contact_name, phone, city]
    )
    res.status(201).json(rows[0])
  } catch (error) {
    res.status(500).json({ error: 'Ошибка добавления поставщика.' })
  }
})

app.delete('/api/tech/postavshik/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Неверный id поставщика.' })
  }

  try {
    const result = await pool.query('DELETE FROM tech_postavshik WHERE id = $1', [id])
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Поставщик не найден.' })
    }
    res.json({ ok: true })
  } catch (error) {
    res.status(500).json({ error: 'Ошибка удаления поставщика.' })
  }
})

app.put('/api/tech/postavshik/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { company_name, contact_name, phone, city } = req.body ?? {}
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Неверный id поставщика.' })
  }
  if (!company_name || !contact_name || !phone || !city) {
    return res.status(400).json({ error: 'Нужно заполнить все поля поставщика.' })
  }

  try {
    const { rows } = await pool.query(
      'UPDATE tech_postavshik SET company_name = $1, contact_name = $2, phone = $3, city = $4 WHERE id = $5 RETURNING id, company_name, contact_name, phone, city',
      [company_name, contact_name, phone, city, id]
    )
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Поставщик не найден.' })
    }
    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ error: 'Ошибка редактирования поставщика.' })
  }
})

app.get('/api/odezda/tovar', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, name, category, size, price, stock FROM odezda_tovar ORDER BY id'
    )
    res.json(rows)
  } catch (error) {
    logDbError('odezda_tovar:select', error)
    res.status(500).json({ error: 'Ошибка чтения таблицы товаров.' })
  }
})

app.post('/api/odezda/tovar', async (req, res) => {
  const { name, category, size, price, stock } = req.body ?? {}
  if (!name || !category || !size || price === undefined || stock === undefined) {
    return res.status(400).json({ error: 'Нужно заполнить все поля товара.' })
  }

  try {
    const { rows } = await pool.query(
      'INSERT INTO odezda_tovar (name, category, size, price, stock) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, category, size, price, stock',
      [name, category, size, price, stock]
    )
    res.status(201).json(rows[0])
  } catch (error) {
    logDbError('odezda_tovar:insert', error)
    res.status(500).json({ error: 'Ошибка добавления товара.' })
  }
})

app.delete('/api/odezda/tovar/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Неверный id товара.' })
  }

  try {
    const result = await pool.query('DELETE FROM odezda_tovar WHERE id = $1', [id])
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Товар не найден.' })
    }
    res.json({ ok: true })
  } catch (error) {
    logDbError('odezda_tovar:delete', error)
    res.status(500).json({ error: 'Ошибка удаления товара.' })
  }
})

app.put('/api/odezda/tovar/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { name, category, size, price, stock } = req.body ?? {}
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Неверный id товара.' })
  }
  if (!name || !category || !size || price === undefined || stock === undefined) {
    return res.status(400).json({ error: 'Нужно заполнить все поля товара.' })
  }

  try {
    const { rows } = await pool.query(
      'UPDATE odezda_tovar SET name = $1, category = $2, size = $3, price = $4, stock = $5 WHERE id = $6 RETURNING id, name, category, size, price, stock',
      [name, category, size, price, stock, id]
    )
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Товар не найден.' })
    }
    res.json(rows[0])
  } catch (error) {
    logDbError('odezda_tovar:update', error)
    res.status(500).json({ error: 'Ошибка редактирования товара.' })
  }
})

app.get('/api/odezda/zakaz', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, customer_name, order_date, total_amount, status FROM odezda_zakaz ORDER BY id'
    )
    res.json(rows)
  } catch (error) {
    logDbError('odezda_zakaz:select', error)
    res.status(500).json({ error: 'Ошибка чтения таблицы заказов.' })
  }
})

app.post('/api/odezda/zakaz', async (req, res) => {
  const { customer_name, order_date, total_amount, status } = req.body ?? {}
  if (!customer_name || !order_date || total_amount === undefined || !status) {
    return res.status(400).json({ error: 'Нужно заполнить все поля заказа.' })
  }

  try {
    const { rows } = await pool.query(
      'INSERT INTO odezda_zakaz (customer_name, order_date, total_amount, status) VALUES ($1, $2, $3, $4) RETURNING id, customer_name, order_date, total_amount, status',
      [customer_name, order_date, total_amount, status]
    )
    res.status(201).json(rows[0])
  } catch (error) {
    logDbError('odezda_zakaz:insert', error)
    res.status(500).json({ error: 'Ошибка добавления заказа.' })
  }
})

app.delete('/api/odezda/zakaz/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Неверный id заказа.' })
  }

  try {
    const result = await pool.query('DELETE FROM odezda_zakaz WHERE id = $1', [id])
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Заказ не найден.' })
    }
    res.json({ ok: true })
  } catch (error) {
    logDbError('odezda_zakaz:delete', error)
    res.status(500).json({ error: 'Ошибка удаления заказа.' })
  }
})

app.put('/api/odezda/zakaz/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { customer_name, order_date, total_amount, status } = req.body ?? {}
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Неверный id заказа.' })
  }
  if (!customer_name || !order_date || total_amount === undefined || !status) {
    return res.status(400).json({ error: 'Нужно заполнить все поля заказа.' })
  }

  try {
    const { rows } = await pool.query(
      'UPDATE odezda_zakaz SET customer_name = $1, order_date = $2, total_amount = $3, status = $4 WHERE id = $5 RETURNING id, customer_name, order_date, total_amount, status',
      [customer_name, order_date, total_amount, status, id]
    )
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Заказ не найден.' })
    }
    res.json(rows[0])
  } catch (error) {
    logDbError('odezda_zakaz:update', error)
    res.status(500).json({ error: 'Ошибка редактирования заказа.' })
  }
})

app.get('/api/odezda/klient', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, full_name, phone, email, city FROM odezda_klient ORDER BY id'
    )
    res.json(rows)
  } catch (error) {
    logDbError('odezda_klient:select', error)
    res.status(500).json({ error: 'Ошибка чтения таблицы клиентов.' })
  }
})

app.post('/api/odezda/klient', async (req, res) => {
  const { full_name, phone, email, city } = req.body ?? {}
  if (!full_name || !phone || !email || !city) {
    return res.status(400).json({ error: 'Нужно заполнить все поля клиента.' })
  }

  try {
    const { rows } = await pool.query(
      'INSERT INTO odezda_klient (full_name, phone, email, city) VALUES ($1, $2, $3, $4) RETURNING id, full_name, phone, email, city',
      [full_name, phone, email, city]
    )
    res.status(201).json(rows[0])
  } catch (error) {
    logDbError('odezda_klient:insert', error)
    res.status(500).json({ error: 'Ошибка добавления клиента.' })
  }
})

app.delete('/api/odezda/klient/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Неверный id клиента.' })
  }

  try {
    const result = await pool.query('DELETE FROM odezda_klient WHERE id = $1', [id])
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Клиент не найден.' })
    }
    res.json({ ok: true })
  } catch (error) {
    logDbError('odezda_klient:delete', error)
    res.status(500).json({ error: 'Ошибка удаления клиента.' })
  }
})

app.put('/api/odezda/klient/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { full_name, phone, email, city } = req.body ?? {}
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Неверный id клиента.' })
  }
  if (!full_name || !phone || !email || !city) {
    return res.status(400).json({ error: 'Нужно заполнить все поля клиента.' })
  }

  try {
    const { rows } = await pool.query(
      'UPDATE odezda_klient SET full_name = $1, phone = $2, email = $3, city = $4 WHERE id = $5 RETURNING id, full_name, phone, email, city',
      [full_name, phone, email, city, id]
    )
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Клиент не найден.' })
    }
    res.json(rows[0])
  } catch (error) {
    logDbError('odezda_klient:update', error)
    res.status(500).json({ error: 'Ошибка редактирования клиента.' })
  }
})

app.get('/api/odezda/postavshik', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, company_name, contact_name, phone, city FROM odezda_postavshik ORDER BY id'
    )
    res.json(rows)
  } catch (error) {
    logDbError('odezda_postavshik:select', error)
    res.status(500).json({ error: 'Ошибка чтения таблицы поставщиков.' })
  }
})

app.post('/api/odezda/postavshik', async (req, res) => {
  const { company_name, contact_name, phone, city } = req.body ?? {}
  if (!company_name || !contact_name || !phone || !city) {
    return res.status(400).json({ error: 'Нужно заполнить все поля поставщика.' })
  }

  try {
    const { rows } = await pool.query(
      'INSERT INTO odezda_postavshik (company_name, contact_name, phone, city) VALUES ($1, $2, $3, $4) RETURNING id, company_name, contact_name, phone, city',
      [company_name, contact_name, phone, city]
    )
    res.status(201).json(rows[0])
  } catch (error) {
    logDbError('odezda_postavshik:insert', error)
    res.status(500).json({ error: 'Ошибка добавления поставщика.' })
  }
})

app.delete('/api/odezda/postavshik/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Неверный id поставщика.' })
  }

  try {
    const result = await pool.query('DELETE FROM odezda_postavshik WHERE id = $1', [id])
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Поставщик не найден.' })
    }
    res.json({ ok: true })
  } catch (error) {
    logDbError('odezda_postavshik:delete', error)
    res.status(500).json({ error: 'Ошибка удаления поставщика.' })
  }
})

app.put('/api/odezda/postavshik/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { company_name, contact_name, phone, city } = req.body ?? {}
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Неверный id поставщика.' })
  }
  if (!company_name || !contact_name || !phone || !city) {
    return res.status(400).json({ error: 'Нужно заполнить все поля поставщика.' })
  }

  try {
    const { rows } = await pool.query(
      'UPDATE odezda_postavshik SET company_name = $1, contact_name = $2, phone = $3, city = $4 WHERE id = $5 RETURNING id, company_name, contact_name, phone, city',
      [company_name, contact_name, phone, city, id]
    )
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Поставщик не найден.' })
    }
    res.json(rows[0])
  } catch (error) {
    logDbError('odezda_postavshik:update', error)
    res.status(500).json({ error: 'Ошибка редактирования поставщика.' })
  }
})

const port = Number(process.env.PORT ?? 3001)
app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`)
})
