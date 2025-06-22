import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [showUser, setShowUser] = useState(false)
  const [showTodo, setShowTodo] = useState(false)

  // 属性名リスト（全ての属性を網羅）
  const userFields = ['id', 'name', 'email']
  const todoFields = ['id', 'content', 'status', 'userId']

  // 属性ごとのチェック状態
  const [checkedUserFields, setCheckedUserFields] = useState<string[]>([])
  const [checkedTodoFields, setCheckedTodoFields] = useState<string[]>([])

  // 取得データ
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // チェックボックスのハンドラ
  const handleUserFieldChange = (field: string) => {
    setCheckedUserFields(prev =>
      prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
    )
  }
  const handleTodoFieldChange = (field: string) => {
    setCheckedTodoFields(prev =>
      prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
    )
  }

  // GraphQLクエリ組み立て
  const buildQuery = () => {
    let query = 'query SelectedData {'
    if (showUser && checkedUserFields.length > 0) {
      query += `\n  users(ids: [\"dummy\"]) {\n    ${checkedUserFields.join(' ')}\n  }`
    }
    if (showTodo && checkedTodoFields.length > 0) {
      query += `\n  todos(ids: [\"dummy\"]) {\n    ${checkedTodoFields.join(' ')}\n  }`
    }
    query += '\n}'
    return query
  }

  // 取得ボタン押下時
  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault()
    const query = buildQuery()
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch('http://localhost:80/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      })
      const data = await res.json()
      setResult(data)
    } catch (err: any) {
      setError(err.message || 'エラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <form action="" aria-labelledby='label' onSubmit={handleFetch}>
        <h2 id="label">取得するデータ選択</h2>
        {/* user */}
        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1em' }}>
          <label style={{ minWidth: '60px' }}>
            <input type="checkbox" checked={showUser} onChange={e => setShowUser(e.target.checked)} />
            user
          </label>
          {showUser && (
            <div style={{ marginLeft: '2em', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              {userFields.map(field => (
                <label key={field} style={{ marginBottom: '0.2em', textAlign: 'left', width: '100%' }}>
                  <input
                    type="checkbox"
                    checked={checkedUserFields.includes(field)}
                    onChange={() => handleUserFieldChange(field)}
                  /> {field}
                </label>
              ))}
            </div>
          )}
        </div>
        {/* todo */}
        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1em' }}>
          <label style={{ minWidth: '60px' }}>
            <input type="checkbox" checked={showTodo} onChange={e => setShowTodo(e.target.checked)} />
            todo
          </label>
          {showTodo && (
            <div style={{ marginLeft: '2em', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              {todoFields.map(field => (
                <label key={field} style={{ marginBottom: '0.2em', textAlign: 'left', width: '100%' }}>
                  <input
                    type="checkbox"
                    checked={checkedTodoFields.includes(field)}
                    onChange={() => handleTodoFieldChange(field)}
                  /> {field}
                </label>
              ))}
            </div>
          )}
        </div>
        <button type="submit">取得</button>
      </form>
      {/* 結果表示 */}
      <div style={{ marginTop: '2em', textAlign: 'left' }}>
        {loading && <div>取得中...</div>}
        {error && <div style={{ color: 'red' }}>エラー: {error}</div>}
        {result && (
          <pre style={{ background: '#f4f4f4', padding: '1em', borderRadius: '4px', color: '#222' }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}

export default App
