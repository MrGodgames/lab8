import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../gordienko.css'

const API_BASE = 'http://localhost:3001'

function TechZakaz() {
  const [rows, setRows] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    customer_name: '',
    order_date: '',
    total_amount: '',
    status: '',
  })
  const [formError, setFormError] = useState('')
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({
    customer_name: '',
    order_date: '',
    total_amount: '',
    status: '',
  })

  useEffect(() => {
    let active = true
    fetch(`${API_BASE}/api/tech/zakaz`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка загрузки заказов')
        }
        return response.json()
      })
      .then((data) => {
        if (active) {
          setRows(data)
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message)
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormError('')

    if (!formData.customer_name || !formData.order_date || formData.total_amount === '' || !formData.status) {
      setFormError('Заполни все поля заказа.')
      return
    }

    try {
      const response = await fetch(`${API_BASE}/api/tech/zakaz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: formData.customer_name,
          order_date: formData.order_date,
          total_amount: Number(formData.total_amount),
          status: formData.status,
        }),
      })

      if (!response.ok) {
        throw new Error('Не удалось добавить заказ')
      }

      const created = await response.json()
      setRows((prev) => [...prev, created])
      setFormData({ customer_name: '', order_date: '', total_amount: '', status: '' })
    } catch (err) {
      setFormError(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/api/tech/zakaz/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Не удалось удалить заказ')
      }

      setRows((prev) => prev.filter((row) => row.id !== id))
    } catch (err) {
      setFormError(err.message)
    }
  }

  const startEdit = (row) => {
    setEditId(row.id)
    setEditData({
      customer_name: row.customer_name ?? '',
      order_date: row.order_date ? String(row.order_date).slice(0, 10) : '',
      total_amount: row.total_amount ?? '',
      status: row.status ?? '',
    })
    setFormError('')
  }

  const handleEditChange = (event) => {
    const { name, value } = event.target
    setEditData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async (id) => {
    if (!editData.customer_name || !editData.order_date || editData.total_amount === '' || !editData.status) {
      setFormError('Заполни все поля заказа.')
      return
    }

    try {
      const response = await fetch(`${API_BASE}/api/tech/zakaz/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: editData.customer_name,
          order_date: editData.order_date,
          total_amount: Number(editData.total_amount),
          status: editData.status,
        }),
      })

      if (!response.ok) {
        throw new Error('Не удалось обновить заказ')
      }

      const updated = await response.json()
      setRows((prev) => prev.map((row) => (row.id === id ? updated : row)))
      setEditId(null)
    } catch (err) {
      setFormError(err.message)
    }
  }

  const handleCancel = () => {
    setEditId(null)
  }

  return (
      <div className='Techmain'>
        <NavLink className='back' to="/Tech">назад</NavLink>
        <div className='tablewrap'>
          <h2>Заказы</h2>
          <form className='data-form' onSubmit={handleSubmit}>
            <input
              name="customer_name"
              placeholder="Клиент"
              value={formData.customer_name}
              onChange={handleChange}
            />
            <input
              name="order_date"
              type="date"
              value={formData.order_date}
              onChange={handleChange}
            />
            <input
              name="total_amount"
              type="number"
              step="0.01"
              placeholder="Сумма"
              value={formData.total_amount}
              onChange={handleChange}
            />
            <input
              name="status"
              placeholder="Статус"
              value={formData.status}
              onChange={handleChange}
            />
            <button type="submit">Добавить</button>
          </form>
          {formError && <p className='table-error'>{formError}</p>}
          {loading && <p>Загрузка...</p>}
          {error && <p className='table-error'>{error}</p>}
          {!loading && !error && (
            <table className='data-table'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Клиент</th>
                  <th>Дата</th>
                  <th>Сумма</th>
                  <th>Статус</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>
                      {editId === row.id ? (
                        <input
                          name="customer_name"
                          value={editData.customer_name}
                          onChange={handleEditChange}
                        />
                      ) : (
                        row.customer_name
                      )}
                    </td>
                    <td>
                      {editId === row.id ? (
                        <input
                          name="order_date"
                          type="date"
                          value={editData.order_date}
                          onChange={handleEditChange}
                        />
                      ) : (
                        row.order_date
                      )}
                    </td>
                    <td>
                      {editId === row.id ? (
                        <input
                          name="total_amount"
                          type="number"
                          step="0.01"
                          value={editData.total_amount}
                          onChange={handleEditChange}
                        />
                      ) : (
                        row.total_amount
                      )}
                    </td>
                    <td>
                      {editId === row.id ? (
                        <input
                          name="status"
                          value={editData.status}
                          onChange={handleEditChange}
                        />
                      ) : (
                        row.status
                      )}
                    </td>
                    <td>
                      {editId === row.id ? (
                        <>
                          <button
                            className='save-button'
                            type="button"
                            onClick={() => handleSave(row.id)}
                          >
                            Сохранить
                          </button>
                          <button
                            className='cancel-button'
                            type="button"
                            onClick={handleCancel}
                          >
                            Отмена
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className='edit-button'
                            type="button"
                            onClick={() => startEdit(row)}
                          >
                            Редактировать
                          </button>
                          <button
                            className='delete-button'
                            type="button"
                            onClick={() => handleDelete(row.id)}
                          >
                            Удалить
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
  )
}

export default TechZakaz
