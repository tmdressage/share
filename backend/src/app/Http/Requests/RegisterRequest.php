<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'name' => ['required', 'max:20'],
            'email' => ['required','email', 'unique:users,email'],
            'password' => ['required', 'min:6'],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => '! 名前を入力してください。',
            'name.max' => '! 名前を20文字以下で入力してください。',
            'email.required' => '! メールアドレスを入力してください。',
            'email.email' => '! 有効なメールアドレス形式を入力してください。',
            'email.unique' => '! 既に登録されているメールアドレスです。',
            'password.required' => '! パスワードを入力してください。',
            'password.min' => '! パスワードを6文字以上で入力してください。',
        ];
    }
}
