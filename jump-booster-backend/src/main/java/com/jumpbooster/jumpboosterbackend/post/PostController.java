package com.jumpbooster.jumpboosterbackend.post;

import com.jumpbooster.jumpboosterbackend.individual.Account;
import com.jumpbooster.jumpboosterbackend.individual.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
public class PostController {
    private final PostService postService;
    private final AccountService accountService;

    @Autowired
    public PostController(PostService postService, AccountService accountService){this.postService = postService; this.accountService = accountService;}

    @GetMapping("/fetchAllPosts")
    public ResponseEntity<List<Post>> getAllPosts(){
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("/post/fetch-all-active-posts")
    public ResponseEntity<List<Post>> getAllActivePosts(){
        return ResponseEntity.ok(postService.getAllActivePosts());
    }

    @PostMapping("/fetchBlogPostById")
    public ResponseEntity<Post> getPostById(@RequestBody Long postId){
        Optional<Post> result = postService.getPostById(postId);
        return result.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/fetchPostsByUserId")
    public ResponseEntity<List<Post>> getPostsByUserId(@RequestBody Long userId){
        return ResponseEntity.ok(postService.getPostsByUserId(userId));
    }

    @PostMapping("/create-post")
    public void createPost(@RequestParam("userId") Long userId,
                           @RequestParam("title") String title,
                           @RequestParam("titleImg") MultipartFile titleImg,
                           @RequestParam("content") String content,
                           @RequestParam("contentImg") MultipartFile contentImg,
                           @RequestParam("goalMoney") Long goalMoney) throws IOException {
        Post newPost = new Post(userId, title, titleImg.getBytes(), content, contentImg.getBytes(), LocalDateTime.now(), goalMoney);
        postService.createPost(newPost);
    }

    @DeleteMapping("/post/delete")
    public ResponseEntity<String> deletePost(@RequestParam("postId") Long postId,
                                             @RequestParam("userId") Long userId){
        Optional<Post> post = postService.getPostById(postId);
        if (post.isEmpty()) return ResponseEntity.ok("There is no post.");
        Optional<Account> account = accountService.getAccountById(userId);
        if (account.isEmpty()) return ResponseEntity.ok("Non-existent account.");
        if (!account.get().getRole().equals("administrator")) return ResponseEntity.ok("You have no right for deletion.");
        postService.deletePost(postId);
        return ResponseEntity.ok("OK");
    }

    @PostMapping("/post/abort")
    public ResponseEntity<String> abortPost(@RequestParam("postId") Long postId,
                                             @RequestParam("userId") Long userId){
        Optional<Post> post = postService.getPostById(postId);
        if (post.isEmpty()) return ResponseEntity.ok("There is no post.");
        Optional<Account> account = accountService.getAccountById(userId);
        if (account.isEmpty()) return ResponseEntity.ok("Non-existent account.");
        if (!account.get().getRole().equals("administrator")) return ResponseEntity.ok("You have no right for abortion.");
        postService.abortPost(postId);
        return ResponseEntity.ok("OK");
    }
}
