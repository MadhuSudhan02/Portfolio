import { Component, OnInit, HostListener  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Education, experienceData, technicalSkills } from './constant/portfolio-constant';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolioProject';
  experienceList : any = experienceData;
  technicalSkillsList: any = technicalSkills;
  educationList : any = Education;
  activeSection: string = 'home';
  constructor(private router: Router) { }
  ngOnInit(): void {
    this.activeSection = 'home';
    console.log(this.experienceList);
  }

  setActiveSection(sectionId: string): void {
    this.activeSection = sectionId;
    let e: any = document.getElementById(sectionId);
    e.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
      inline: 'start'
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    // Get all elements with an ID starting with 'section'
    const sections = document.querySelectorAll('[id="experience"], [id="skills"], [id="education"], [id="home"]');
  
    
   // Find the first section that is at least partially in view
   let inViewSectionId = '';
   sections.forEach((section: any) => {
     const rect = section.getBoundingClientRect();
     if ((rect.top >= 0 && rect.top <= windowHeight) || (rect.bottom >= 0 && rect.bottom <= windowHeight)) {
       inViewSectionId = section.id;
       return; // Exit the loop after finding the first visible section
     }
   });

    // Update the fragment identifier in the URL
    if (inViewSectionId) {
      this.activeSection = inViewSectionId;
      this.router.navigateByUrl(`/#${inViewSectionId}`);
    }
  }

}
