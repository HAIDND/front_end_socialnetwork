// Post routes
router.get("/posts", authenticateToken, adminMiddleware, AdminController.getAllPosts);
router.delete("/posts/:postId", authenticateToken, adminMiddleware, AdminController.deletePost);
