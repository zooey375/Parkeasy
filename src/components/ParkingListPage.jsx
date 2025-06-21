import { useEffect, useState } from 'react';
import axios from 'axios'; // 使用 axios 來發送 HTTP 請求
import { Card, Button, Container, Row, Col } from 'react-bootstrap'; 
// Container:外框容器、 Row + Col:卡片排版、Card :卡片格式。


function ParkingListPage() {
    const [parkingLots, setParkingLots] = useState([]);

    // 載入所有停車場資料 (只會執行一次)
    useEffect(() => {
        axios.get('http://localhost:8086/api/parkinglots') // 後端 API
            .then(res => {
                console.log('✅ 成功載入停車場資料:', res.data);
                setParkingLots(res.data);
            })
            .catch(err => {
                console.error('❌ 載入停車場資料失敗:', err);
                alert('無法載入停車場資料，請檢查後端是否有啟動');
            });
    }, []);

    return (
        <Container className="my-4">
            <h2 className="mb-4">所有停車場清單</h2>
            
            {parkingLots.length === 0 ? (
                <p>目前尚無任何停車場資料。</p>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {parkingLots.map((lot) =>(
                        <Col key={lot.id}>
                           <Card className="h-100 shadow-sm">
                                <Card.Body>
                                    <Card.Title>{lot.name}</Card.Title>
                                    <Card.Text>

                                        類型：{lot.type}<br />
                                        友善：{lot.friendly ? '😻 是' : '😿 否'}<br />
                                        收費：{lot.price}<br />
                                        地址：<a href={lot.mapUrl} target="_blank" rel="noreferrer">GoogleMap</a><br />
                                        備註：{lot.description}

                                    </Card.Text>
                                </Card.Body>
                            </Card> 
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default ParkingListPage;