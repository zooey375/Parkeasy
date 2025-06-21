import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [formData, setFormData] = useState({ 
        username: '', 
        password: '',
        email: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // 當表單送出時觸發
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await fetch('http://localhost:8086/api/auth/register',{
                method: 'POST',
                headers: { 'Content-Type':'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if(response.ok) {
                alert("註冊成功，請前往你的信箱點擊驗證信 ~");
                navigate('/');  // 導向首頁
            }else {
            setMessage(result.message || "註冊失敗");
            }
        } catch (error) {
            console.error("發生錯誤:",error);
            setMessage("註冊失敗，請稍後再試試");
        }
    };

    return (
        <div style={{ 
            padding: '40px',
            maxWidth: '400px',
            margin: '0 auto' }}>

            <h2>註冊帳號</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>帳號:</label><br/>
                    <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                    style={{ width: '100%', padding: '8px' }} />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>密碼:</label><br/>
                    <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    style={{ width: '100%', padding: '8px' }}/>
                </div>

                <div style={{ marginBottom: '15px' }}>
                <label>信箱:</label><br/>
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    style={{ width: '100%', padding: '8px' }}
                />
                </div>

                <button type="submit" style={{ padding: '8px 16px' }}>註冊</button>
            </form>

            {message && (
            <p style={{ marginTop: '15px', color: 'green' }}>{message}</p>
        )}
        </div>
    );
}
export default RegisterPage;
