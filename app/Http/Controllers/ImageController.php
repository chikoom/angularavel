<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImageUploadRequest;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function upload(ImageUploadRequest $request){
        $file = $request->file('image');
        $fileName = \Str::random(10);
        $url = \Storage::putFileAs('images', $file, $fileName . '.' . $file->extension());

        return [
            'url' => env('APP_URL'). '/' . $url
        ];
    }
}
