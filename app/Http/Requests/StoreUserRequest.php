<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Rule;


class StoreUserRequest extends FormRequest
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
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'nombres' => ['required', 'string','max:50'],
            'apellidos' => ['required', 'string','max:50'],
            'email' => ['required', 'email', 'unique:users,email','max:50'],
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->symbols()
                    ->numbers()
            ],
            'direccion' => ['required', 'string','max:100'],
            'telefono' => ['required', 'numeric','digits:10'],
            'tipoUsuario' => ['required', 'string',Rule::in(['Administrador', 'Coordinador','Visualizador'])],
        ];
    }
}
