<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'nombres' => $this->nombres, 
            'apellidos' => $this->apellidos,
            'email' => $this->email,
            'direccion'=> $this->direccion,
            'telefono' => $this->telefono,
            'tipoUsuario'=> $this->tipoUsuario,
            'created_at' => $this->created_at?->format('Y-m-d H:i:s') ?? "",
        ];
    }
}

