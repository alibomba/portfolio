<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Events\PostNotification;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Post::latest()->paginate(12);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $messages = [
            'image.required' => 'Wybierz obraz miniatury!',
            'image' => 'Plik musi być obrazem!',
            'image.max' => 'Obraz może mieć maksymalnie 10MB!',
            'title.required' => 'Podaj tytuł!',
            'title.string' => 'Tytuł musi być tekstem!',
            'title.max' => 'Tytuł może mieć maksymalnie 30 znaków!',
            'description.required' => 'Podaj opis!',
            'description.string' => 'Opis musi być tekstem!',
            'description.max' => 'Opis może mieć maksymalnie 400 znaków!',
            'content.required' => 'Podaj treść posta!',
            'content.string' => 'Treść posta musi być tekstem!',
            'content.max'=> 'Treść posta może mieć maksymalnie 3000 znaków'
        ];

        $request->validate([
            'image' => 'required|image|max:10240',
            'title' => 'required|string|max:30',
            'description' => 'required|string|max:400',
            'content' => 'required|string|max:3000'
        ], $messages);

        $path = $request->file('image')->store('public/post-images');
        $url = asset(Storage::url($path));

        $data = [
            'image' => $url,
            'title' => $request['title'],
            'description' => $request['description'],
            'content' => $request['content']
        ];

        try {
            event(new PostNotification('Nowy post'));
        } catch(Exception $e) {
            return response(['error' => 'Coś poszło nie tak!'], 500);
        }

        return Post::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return Post::find($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $messages = [
            'image.required' => 'Wybierz obraz miniatury!',
            'image' => 'Plik musi być obrazem!',
            'image.max' => 'Obraz może mieć maksymalnie 10MB!',
            'title.required' => 'Podaj tytuł!',
            'title.string' => 'Tytuł musi być tekstem!',
            'title.max' => 'Tytuł może mieć maksymalnie 30 znaków!',
            'description.required' => 'Podaj opis!',
            'description.string' => 'Opis musi być tekstem!',
            'description.max' => 'Opis może mieć maksymalnie 400 znaków!',
            'content.required' => 'Podaj treść posta!',
            'content.string' => 'Treść posta musi być tekstem!',
            'content.max'=> 'Treść posta może mieć maksymalnie 3000 znaków'
        ];

        $request->validate([
            'image' => 'required|image|max:10240',
            'title' => 'required|string|max:30',
            'description' => 'required|string|max:400',
            'content' => 'required|string|max:3000'
        ], $messages);

        $path = $request->file('image')->store('public/post-images');
        $url = asset(Storage::url($path));

        $data = [
            'image' => $url,
            'title' => $request['title'],
            'description' => $request['description'],
            'content' => $request['content']
        ];

        return $post->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        return $post->delete();
    }
}
