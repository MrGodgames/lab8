import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../gordienko.css'

const API_BASE = 'http://localhost:3001'

function TechTovar() {
  const [rows, setRows] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
  })
  const [formError, setFormError] = useState('')
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
  })

  useEffect(() => {
    let active = true
    fetch(`${API_BASE}/api/tech/tovar`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка загрузки товаров')
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

    if (!formData.name || !formData.category || formData.price === '' || formData.stock === '') {
      setFormError('Заполни все поля товара.')
      return
    }

    try {
      const response = await fetch(`${API_BASE}/api/tech/tovar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          category: formData.category,
          price: Number(formData.price),
          stock: Number(formData.stock),
        }),
      })

      if (!response.ok) {
        throw new Error('Не удалось добавить товар')
      }

      const created = await response.json()
      setRows((prev) => [...prev, created])
      setFormData({ name: '', category: '', price: '', stock: '' })
    } catch (err) {
      setFormError(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/api/tech/tovar/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Не удалось удалить товар')
      }

      setRows((prev) => prev.filter((row) => row.id !== id))
    } catch (err) {
      setFormError(err.message)
    }
  }

  const startEdit = (row) => {
    setEditId(row.id)
    setEditData({
      name: row.name ?? '',
      category: row.category ?? '',
      price: row.price ?? '',
      stock: row.stock ?? '',
    })
    setFormError('')
  }

  const handleEditChange = (event) => {
    const { name, value } = event.target
    setEditData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async (id) => {
    if (!editData.name || !editData.category || editData.price === '' || editData.stock === '') {
      setFormError('Заполни все поля товара.')
      return
    }

    try {
      const response = await fetch(`${API_BASE}/api/tech/tovar/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editData.name,
          category: editData.category,
          price: Number(editData.price),
          stock: Number(editData.stock),
        }),
      })

      if (!response.ok) {
        throw new Error('Не удалось обновить товар')
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
          <h2>Товары</h2>
          <form className='data-form' onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Название"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              name="category"
              placeholder="Категория"
              value={formData.category}
              onChange={handleChange}
            />
            <input
              name="price"
              type="number"
              step="0.01"
              placeholder="Цена"
              value={formData.price}
              onChange={handleChange}
            />
            <input
              name="stock"
              type="number"
              placeholder="Остаток"
              value={formData.stock}
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
                  <th>Название</th>
                  <th>Категория</th>
                  <th>Цена</th>
                  <th>Остаток</th>
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
                          name="name"
                          value={editData.name}
                          onChange={handleEditChange}
                        />
                      ) : (
                        row.name
                      )}
                    </td>
                    <td>
                      {editId === row.id ? (
                        <input
                          name="category"
                          value={editData.category}
                          onChange={handleEditChange}
                        />
                      ) : (
                        row.category
                      )}
                    </td>
                    <td>
                      {editId === row.id ? (
                        <input
                          name="price"
                          type="number"
                          step="0.01"
                          value={editData.price}
                          onChange={handleEditChange}
                        />
                      ) : (
                        row.price
                      )}
                    </td>
                    <td>
                      {editId === row.id ? (
                        <input
                          name="stock"
                          type="number"
                          value={editData.stock}
                          onChange={handleEditChange}
                        />
                      ) : (
                        row.stock
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

export default TechTovar
