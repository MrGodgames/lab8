import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../gordienko.css'

const API_BASE = 'http://localhost:3001'

function TechSotrud() {
  const [rows, setRows] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    full_name: '',
    position: '',
    phone: '',
    hire_date: '',
  })
  const [formError, setFormError] = useState('')
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({
    full_name: '',
    position: '',
    phone: '',
    hire_date: '',
  })

  useEffect(() => {
    let active = true
    fetch(`${API_BASE}/api/tech/sotrud`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка загрузки сотрудников')
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

    if (!formData.full_name || !formData.position || !formData.phone || !formData.hire_date) {
      setFormError('Заполни все поля сотрудника.')
      return
    }

    try {
      const response = await fetch(`${API_BASE}/api/tech/sotrud`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.full_name,
          position: formData.position,
          phone: formData.phone,
          hire_date: formData.hire_date,
        }),
      })

      if (!response.ok) {
        throw new Error('Не удалось добавить сотрудника')
      }

      const created = await response.json()
      setRows((prev) => [...prev, created])
      setFormData({ full_name: '', position: '', phone: '', hire_date: '' })
    } catch (err) {
      setFormError(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/api/tech/sotrud/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Не удалось удалить сотрудника')
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
      position: row.position ?? '',
      phone: row.phone ?? '',
      hire_date: row.hire_date ? String(row.hire_date).slice(0, 10) : '',
    })
    setFormError('')
  }

  const handleEditChange = (event) => {
    const { name, value } = event.target
    setEditData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async (id) => {
    if (!editData.full_name || !editData.position || !editData.phone || !editData.hire_date) {
      setFormError('Заполни все поля сотрудника.')
      return
    }

    try {
      const response = await fetch(`${API_BASE}/api/tech/sotrud/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: editData.full_name,
          position: editData.position,
          phone: editData.phone,
          hire_date: editData.hire_date,
        }),
      })

      if (!response.ok) {
        throw new Error('Не удалось обновить сотрудника')
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
          <h2>Сотрудники</h2>
          <form className='data-form' onSubmit={handleSubmit}>
            <input
              name="full_name"
              placeholder="ФИО"
              value={formData.full_name}
              onChange={handleChange}
            />
            <input
              name="position"
              placeholder="Должность"
              value={formData.position}
              onChange={handleChange}
            />
            <input
              name="phone"
              placeholder="Телефон"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              name="hire_date"
              type="date"
              value={formData.hire_date}
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
                  <th>Должность</th>
                  <th>Телефон</th>
                  <th>Дата найма</th>
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
                          name="position"
                          value={editData.position}
                          onChange={handleEditChange}
                        />
                      ) : (
                        row.position
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
                          name="hire_date"
                          type="date"
                          value={editData.hire_date}
                          onChange={handleEditChange}
                        />
                      ) : (
                        row.hire_date
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

export default TechSotrud
