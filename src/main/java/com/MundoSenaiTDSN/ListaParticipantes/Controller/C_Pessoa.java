package com.MundoSenaiTDSN.ListaParticipantes.Controller;

import com.MundoSenaiTDSN.ListaParticipantes.Model.M_Resposta;
import com.MundoSenaiTDSN.ListaParticipantes.Service.S_Login;
import com.MundoSenaiTDSN.ListaParticipantes.Service.S_Pessoa;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class C_Pessoa {

    @GetMapping("/")
    public String landPage(){
        return "Login/login";
    }

    @PostMapping("/")
    public String loginPessoa(@RequestParam("usuario") String usuario,
                              @RequestParam("senha") String senha,
                              HttpSession session){
        session.setAttribute("usuario", S_Login.validaLogin(usuario,senha));
        if(session.getAttribute("usuario") != null) {
            return "redirect:/Home";
        }else{
            return "redirect:/";
        }
    }

    @GetMapping("/cadastro")
    public String getCadastro(){
        return "Cad_pessoa/cad_pessoa";
    }

    @PostMapping("/cadastro")
    @ResponseBody
    public M_Resposta postCadastro(@RequestParam("nome") String nome,
                                   @RequestParam("cpf") String cpf,
                                   @RequestParam("telefone") String telefone,
                                   @RequestParam("email") String email,
                                   @RequestParam("senha") String senha,
                                   @RequestParam("confSenha") String confSenha,
                                   RedirectAttributes redirectAttributes){

        M_Resposta m_resposta = S_Pessoa.cadastrarPessoa(nome,cpf,email,telefone,senha,confSenha);

        return m_resposta;
        }
}
