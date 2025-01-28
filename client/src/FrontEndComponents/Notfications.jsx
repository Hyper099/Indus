import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, ListGroup, Badge, Button } from "react-bootstrap";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:3001/notifications", {
                headers: { token }
            });
            setNotifications(response.data);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    const markAsRead = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(`http://localhost:3001/notifications/${id}/read`, {}, {
                headers: { token }
            });
            fetchNotifications(); // Refresh notifications after marking as read
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    return (
        <Container className="py-4">
            <h2>Notifications</h2>
            <ListGroup>
                {notifications.map((notification) => (
                    <ListGroup.Item key={notification._id} className="d-flex justify-content-between align-items-center">
                        <div>
                            {notification.message} <br />
                            <small className="text-muted">{new Date(notification.timestamp).toLocaleString()}</small>
                        </div>
                        {!notification.read && (
                            <Button variant="primary" size="sm" onClick={() => markAsRead(notification._id)}>
                                Mark as Read
                            </Button>
                        )}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default Notifications;
