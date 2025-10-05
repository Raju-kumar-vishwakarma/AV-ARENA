import React from 'react'
import { FaWhatsapp } from "react-icons/fa6";
import { Facebook, Twitter, Instagram, Youtube, Github,Linkedin } from "lucide-react";


const CreatedBy = () => {
  return (
    <>
        <div className="bg-black h-auto text-center items-center border-b gap-4 ">
            <div>
              <p className="m-auto pt-3 font-extralight">
              Developed By Raju Vishwakama
            </p>
            </div>
            <div className="flex gap-7 justify-center my-4">
              
              <a href="https://www.instagram.com/raju_vishwa.karma/" target="blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              
              <a href="https://api.whatsapp.com/send/?phone=916299384767&text&type=phone_number&app_absent=0" className="text-muted-foreground hover:text-primary transition-colors" target="blank" rel="noopener noreferrer">
                <FaWhatsapp className="h-5 w-5" />
              </a>

              <a href="https://github.com/Raju-kumar-vishwakarma" target="blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>

              <a href="https://www.linkedin.com/in/raju-kumar-a134b9342/" target="blank" rel="noopener noreferrer"  className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
        </div>
    </>
  )
}

export default CreatedBy;
