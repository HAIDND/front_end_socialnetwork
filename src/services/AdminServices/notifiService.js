// Notification routes
router.get("/notifications", authenticateToken, adminMiddleware, AdminController.getAllNotifications);
router.delete("/notifications/:notificationId", adminMiddleware, AdminController.deleteNotification);
