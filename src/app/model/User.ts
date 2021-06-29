import { Postagem } from "./Postagem"

export class User{
    public idUsuario: number
    public nomeUsuario: string
    public usuario: string
    public senha: string
    public foto: string
    public tipoUsuario: string
    public postagem: Postagem[]
}