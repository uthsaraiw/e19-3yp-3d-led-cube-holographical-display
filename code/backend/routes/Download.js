const router = require("express").Router();
const PostFile = require("../models/postFile");

// Define the route to download a code file by postId
router.get('/download-code/:postId', async (req, res) => {
    try {
        const { postId } = req.params;

        // Fetch the post by ID
        const post = await PostFile.findById(postId);

        if (!post) {
            return res.status(404).send('Post not found');
        }

        // Check if the code file exists
        if (!post.code || !post.code.file) {
            return res.status(404).send('Code file not available');
        }

        // Increment the download count for code file
        post.code.downloadCount += 1;

        // Save the updated post
        await post.save();

        
        res.setHeader('Content-Disposition', 'attachment; filename=code-file.txt');
        res.send(post.code.file);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Define the route to download an object file by postId
router.get('/download-object/:postId', async (req, res) => {
    try {
        const { postId } = req.params;

        // Fetch the post by ID
        const post = await PostFile.findById(postId);

        if (!post) {
            return res.status(404).send('Post not found');
        }

        // Check if the object file exists
        if (!post.object || !post.object.file) {
            return res.status(404).send('Object file not available');
        }

        // Increment the download count for object file
        post.object.downloadCount += 1;

        // Save the updated post
        await post.save();

        res.setHeader('Content-Disposition', 'attachment; filename=object-file.obj');
        res.send(post.object.file);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Define the route to share a post by postId
router.put('/share-post/:postId', async (req, res) => {
    try {
        const { postId } = req.params;

        // Fetch the post by ID
        const post = await PostFile.findById(postId);

        if (!post) {
            return res.status(404).send('Post not found');
        }

        // Increment the share count for the post
        post.shareCount += 1;

        // Save the updated post
        await post.save();

        res.status(200).send('Post shared successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;