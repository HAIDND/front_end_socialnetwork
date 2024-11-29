// Friendship routes
router.get("/friendships", authenticateToken, adminMiddleware, AdminController.getAllFriendships);
router.delete("/friendships/:friendshipId", authenticateToken, adminMiddleware, AdminController.deleteFriendship);
