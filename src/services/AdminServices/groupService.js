// Group routes
router.get("/groups", authenticateToken, adminMiddleware, AdminController.getAllGroups);
router.delete("/groups/:groupId", authenticateToken, adminMiddleware, AdminController.deleteGroup);
