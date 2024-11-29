// Message routes
router.get("/messages", authenticateToken, adminMiddleware, AdminController.getAllMessages);
router.delete("/messages/:messageId", authenticateToken, adminMiddleware, AdminController.deleteMessage);
