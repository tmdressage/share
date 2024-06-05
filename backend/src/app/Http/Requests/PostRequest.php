<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'post' => ['required','max:120'],
        ];
    } 
    
    public function messages()
    {
        return [
            'post.required' => '! 投稿内容を入力してください。',
            'post.max' => '! 投稿内容は120字以内で入力してください。',
        ];
    }

}
