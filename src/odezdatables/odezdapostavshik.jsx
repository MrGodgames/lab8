import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './odezda.css'

const API_BASE = 'http://localhost:3001'

function OdezdaPostavshik() {
  const [rows, setRows] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    phone: '',
    city: '',
  })
  const [formError, setFormError] = useState('')
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({
    company_name: '',
    contact_name: '',
    phone: '',
    city: '',
  })

  useEffect(() => {
    let active = true
    fetch(`${API_BASE}/api/odezda/postavshik`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка загрузки поставщиков')
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

    if (!formData.company_name || !formData.contact_name || !formData.phone || !formData.city) {
      setFormError('Заполни все поля поставщика.')
      return
    }

    try {
      const response = await fetch(`${API_BASE}/api/odezda/postavshik`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: formData.company_name,
          contact_name: formData.contact_name,
          phone: formData.phone,
          city: formData.city,
        }),
      })

      if (!response.ok) {
        throw new Error('Не удалось добавить поставщика')
      }

      const created = await response.json()
      setRows((prev) => [...prev, created])
      setFormData({ company_name: '', contact_name: '', phone: '', city: '' })
    } catch (err) {
      setFormError(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/api/odezda/postavshik/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Не удалось удалить поставщика')
      }

      setRows((prev) => prev.filter((row) => row.id !== id))
    } catch (err) {
      setFormError(err.message)
    }
  }

  const startEdit = (row) => {
    setEditId(row.id)
    setEditData({
      company_name: row.company_name ?? '',
      contact_name: row.contact_name ?? '',
      phone: row.phone ?? '',
      city: row.city ?? '',
    })
    setFormError('')
  }

  const handleEditChange = (event) => {
    const { name, value } = event.target
    setEditData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async (id) => {
    if (!editData.company_name || !editData.contact_name || !editData.phone || !editData.city) {
      setFormError('Заполни все поля поставщика.')
      return
    }

    try {
      const response = await fetch(`${API_BASE}/api/odezda/postavshik/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: editData.company_name,
          contact_name: editData.contact_name,
          phone: editData.phone,
          city: editData.city,
        }),
      })

      if (!response.ok) {
        throw new Error('Не удалось обновить поставщика')
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
          <h2>Поставщики</h2>
          <form className='data-form' onSubmit={handleSubmit}>
            <input
              name="company_name"
              placeholder="Компания"
              value={formData.company_name}
              onChange={handleChange}
            />
            <input
              name="contact_name"
              placeholder="Контакт"
              value={formData.contact_name}
              onChange={handleChange}
            />
            <input
              name="phone"
              placeholder="Телефон"
              value={formData.phone}
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
                  <th>Компания</th>
                  <th>Контакт</th>
                  <th>Телефон</th>
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
                          name="company_name"
                          value={editData.company_name}
                          onChange={handleEditChange}
                        />
                      ) : (
                        row.company_name
                      )}
                    </td>
                    <td>
                      {editId === row.id ? (
                        <input
                          name="contact_name"
                          value={editData.contact_name}
                          onChange={handleEditChange}
                        />
                      ) : (
                        row.contact_name
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

export default OdezdaPostavshik
