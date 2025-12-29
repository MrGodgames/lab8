import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './odezda.css'

const API_BASE = 'http://localhost:3001'

function OdezdaKlient() {
  const [rows, setRows] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    city: '',
  })
  const [formError, setFormError] = useState('')
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({
    full_name: '',
    phone: '',
    email: '',
    city: '',
  })

  useEffect(() => {
    let active = true
    fetch(`${API_BASE}/api/odezda/klient`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка загрузки клиентов')
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

    if (!formData.full_name || !formData.phone || !formData.email || !formData.city) {
      setFormError('Заполни все поля клиента.')
      return
    }

    try {
      const response = await fetch(`${API_BASE}/api/odezda/klient`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.full_name,
          phone: formData.phone,
          email: formData.email,
          city: formData.city,
        }),
      })

      if (!response.ok) {
        throw new Error('Не удалось добавить клиента')
      }

      const created = await response.json()
      setRows((prev) => [...prev, created])
      setFormData({ full_name: '', phone: '', email: '', city: '' })
    } catch (err) {
      setFormError(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/api/odezda/klient/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Не удалось удалить клиента')
      }

      setRows((prev) => prev.filter((row) => row.id !== id))
    } catch (err) {
      setFormError(err.message)
    }
  }

  const startEdit = (row) => {
    setEditId(row.id)
    setEditData({
      full_name: row.full_name ?? '',
      phone: row.phone ?? '',
      email: row.email ?? '',
      city: row.city ?? '',
    })
    setFormError('')
  }

  const handleEditChange = (event) => {
    const { name, value } = event.target
    setEditData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async (id) => {
    if (!editData.full_name || !editData.phone || !editData.email || !editData.city) {
      setFormError('Заполни все поля клиента.')
      return
    }

    try {
      const response = await fetch(`${API_BASE}/api/odezda/klient/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: editData.full_name,
          phone: editData.phone,
          email: editData.email,
          city: editData.city,
        }),
      })

      if (!response.ok) {
        throw new Error('Не удалось обновить клиента')
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
      <div className='Techmain odezda-page'>
        <NavLink className='back' to="/Odezda">назад</NavLink>
        <div className='tablewrap'>
          <h2>Клиенты</h2>
          <form className='data-form' onSubmit={handleSubmit}>
            <input
              name="full_name"
              placeholder="ФИО"
              value={formData.full_name}
              onChange={handleChange}
            />
            <input
              name="phone"
              placeholder="Телефон"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              name="email"
              placeholder="Почта"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              name="city"
              placeholder="Город"
              value={formData.city}
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
                  <th>ФИО</th>
                  <th>Телефон</th>
                  <th>Почта</th>
                  <th>Город</th>
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
                          name="full_name"
                          value={editData.full_name}
                          onChange={handleEditChange}
                        />
                      ) : (
                        row.full_name
                      )}
                    </td>
                    <td>
                      {editId === row.id ? (
                        <input
                          name="phone"
                          value={editData.phone}
                          onChange={handleEditChange}
                        />
                      ) : (
                        row.phone
                      )}
                    </td>
                    <td>
                      {editId === row.id ? (
                        <input
                          name="email"
                          value={editData.email}
                          onChange={handleEditChange}
                        />
                      ) : (
                        row.email
                      )}
                    </td>
                    <td>
                      {editId === row.id ? (
                        <input
                          name="city"
                          value={editData.city}
                          onChange={handleEditChange}
                        />
                      ) : (
                        row.city
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

export default OdezdaKlient
