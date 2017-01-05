$(document).ready(function(){

  //initialize scroll reveal plugin
  //will animate divs as user scrolls down
  window.sr = ScrollReveal();
  sr.reveal('#degrees');
  sr.reveal('#minors');
  sr.reveal('#employment');
  sr.reveal('#people');
  sr.reveal('#resources');
  sr.reveal('#news');
  sr.reveal('#contact');

  //apply the sticky function to the nav to make it stick to the top of the page on scroll
   $("#nav-wrapper").sticky();

   //apply tabs plugin to resources tabs
   $('.tabs').tabslet();

   //apply anchor scroll plugin which will ease motion when clicking on anchor links
   $('.anchor-scroll').anchorScroll({
      scrollSpeed: 800, // scroll speed
      offsetTop: 0, // offset for fixed top bars (defaults to 0)
   });

   //toggle function for People for Faculty vs Staff
   $("#fac-link").on("click", function(e){
       $("#staff-grid").hide(); //if the faculty button is clicked on hide the staff content
       $("#faculty-grid").fadeIn(); //fade in the faculty content

       $("#staff-link").removeClass("selected"); //remove the selected styles from the staff link
       $("#fac-link").addClass("selected"); //apply to faculty

   });

   $("#staff-link").on("click", function(e){
       $("#faculty-grid").hide(); //if the staff button is clicked on hide the faculty content
       $("#staff-grid").fadeIn(); //fade in the staff content

       $("#fac-link").removeClass("selected"); // remove the selected styles from the staff link
       $("#staff-link").addClass("selected"); //apply to faculty
   });

   //toggle function for the News section for this year vs older stories
   $("#year-link").on("click", function(e){
       $("#older-content").hide(); //if the year link is selected hide the older stories
       $("#year-content").fadeIn(); //fade in the stories from this year

       $("#older-link").removeClass("selected"); //remove the selected styles for the older stories link
       $("#year-link").addClass("selected"); //apply to this year link

   });

   $("#older-link").on("click", function(e){
       $("#year-content").hide(); //if the older stories link is selected hide the stories from this year
       $("#older-content").fadeIn(); //fade in the older stories

       $("#year-link").removeClass("selected"); //remove the selected styles for this year stories link
       $("#older-link").addClass("selected"); //apply to older stories link
   });




  //pull in API data for the about section and append to the about div section
  //content includes the title, description and quote
  myXhr('get',{path:'/about/'},'#about').done(function(json){
      var x="<h2 class='light-heading'>"+json.title+"</h2>";
      x+="<p class='light-body'>"+json.description+"</p>";
      x+="<p class='quote'><i class='fa fa-quote-left' aria-hidden='true' style='color:#f78b35;margin-left:5px;font-size:18px;'></i>"+" "+json.quote+" "+"<i class='fa fa-quote-right' aria-hidden='true' style='color:#f78b35;margin-right:5px;font-size:18px;;'></i></p>";
      x+="<p class='quote-author'>"+"- "+json.quoteAuthor+"</p>";
      $('#about').html(x);
  });

  //pull in API data for the undergrad degrees
  //loop through the content to create each block for each degrees
  //assign an icon based on which degree it is
  myXhr('get',{path:'/degrees/undergraduate/'},'#undergrad-grid').done(function(json){
    var icon='';
      $.each(json.undergraduate,function(i, item){
        if(item.degreeName == 'wmc'){
          icon = '<i class="fa fa-globe" aria-hidden="true"></i><br/>'
        }

        else if(item.degreeName == 'hcc'){
          icon = '<i class="fa fa-hand-paper-o" aria-hidden="true"></i><br/>'
        }

        else if(item.degreeName == 'cit'){
          icon ='<i class="fa fa-laptop" aria-hidden="true"></i><br/>'
        }
          $('#undergrad-grid').append("<div class='card-flip'><div class='front'><h2 class='degree-title'>"+icon+item.title+"</h2></div><div class='back'><p class='degree-desc'>"+item.description+"</p><p class='concentration-list'>Concentrations:<br/>"+item.concentrations[i]+"</p></div></div>");
    })
    //apply the card flip plugin to the boxes
    $(".card-flip").flip({forceHeight:true,forceHeight:true,autoSize:false});
  });

  //pull in API data for the grad degrees
  //loop through the content to create each block for each degrees
  //assign an icon based on which degree it is
  myXhr('get',{path:'/degrees/graduate/'},'#grad-grid').done(function(json){
    var icon='';
      $.each(json.graduate,function(i, item){
         if(item.degreeName != "graduate advanced certificates"){

           if(item.degreeName == 'ist'){
             icon = '<i class="fa fa-keyboard-o" aria-hidden="true"></i><br/>'
           }

           else if(item.degreeName == 'hci'){
             icon = '<i class="fa fa-sticky-note-o" aria-hidden="true"></i><br/>'
           }

           else if(item.degreeName == 'nsa'){
             icon = '<i class="fa fa-server" aria-hidden="true"></i><br/>'
           }
          $('#grad-grid').append("<div class='card-flip'><div class='front'><h2 class='degree-title'>"+icon+item.title+"</h2></div><div class='back'><p class='degree-desc'>"+item.description+"</p><p class='concentration-list'>Concentrations:<br/>"+item.concentrations+"</p></div></div>");
           }
    })
    //apply the card flip plugin to the boxes
    $(".card-flip").flip({forceHeight:true,forceHeight:true,autoSize:false});
  });


  //pull in API data for the minors
  //loop through the content to create each block for each degrees
  //assign an icon based on which degree it is
  myXhr('get',{path:'/minors/'},'#minors-grid').done(function(json){
    var icon='';
      $.each(json.UgMinors,function(i, item){
        if(item.name == 'DBDDI-MN'){
          icon = '<i class="fa fa-database" aria-hidden="true"></i><br />'
        }
        else if(item.name == 'GIS-MN'){
          icon = '<i class="fa fa-map-marker" aria-hidden="true"></i><br />'
        }
        else if(item.name == 'MEDINFO-MN'){
          icon = '<i class="fa fa-medkit" aria-hidden="true"></i><br />'
        }
        else if(item.name=='MDDEV-MN'){
          icon = '<i class="fa fa-code" aria-hidden="true"></i><br />'
        }
        else if(item.name == 'MDEV-MN'){
          icon = '<i class="fa fa-mobile" aria-hidden="true"></i><br />'
        }
        else if(item.name == 'NETSYS-MN'){
          icon = '<i class="fa fa-sitemap" aria-hidden="true"></i><br />'
        }
        else if(item.name == 'WEBDD-MN'){
          icon = '<i class="fa fa-html5" aria-hidden="true"></i><br />'
        }
        else if(item.name == 'WEBD-MN'){
          icon = '<i class="fa fa-object-group" aria-hidden="true"></i><br />'
        }
          $('#minors-grid').append("<a href='#"+item.name+"-popup' class='popup-minor'><div class='minors-flip'><h2 class='minor-title'>"+icon+item.title+"</h2></div><a><div id='"+item.name+"-popup' class='white-popup-minors mfp-hide'><h2 class='dark-subhead'>Description</h2><p class='dark-copy'>"+item.description+"</p><br/><h2 class='dark-subhead'>Courses:</h2><p class='dark-copy'>"+item.courses+"</p></div>");
    })

    $('.popup-minor').magnificPopup({type:'inline', midClick: true });
  });

  //add in the introcutory employment content to the employment section
  myXhr('get',{path:'/employment/'},'#employment').done(function(json){
    $('#employment').append("<h2 class='dark-heading'>"+json.introduction.title+"</h2>");
    $.each(json.introduction.content,function(i, item){
      $('#employment').append("<h3 class='dark-subhead'>"+item.title+"</h3><p class='dark-copy'>"+item.description+"</p>");
    })

    //loop through the degree statistics and create a grid with each content
    $('#employment').append("<h2 class='dark-subhead'>"+json.degreeStatistics.title+"</h2><p class='dark-copy'>Hover over a number to learn more!</p>")
    $.each(json.degreeStatistics.statistics,function(i, item){
      $('#employment').append("<div class='stat-box'><h3 class='emp-stat'>"+item.value+"</h3><br/><p class='stat-desc'>"+item.description+"</p></div>");
  })

  //add in the list of employers to the employment section
  $('#employment').append("<h2 class='dark-subhead'>"+json.employers.title+"</h2>");
  $.each(json.employers.employerNames,function(i, item){
    $('#employment').append("<p class='employer-list'>"+item+"</p>");
  })

  //add in the list of careers to the employment section
  $('#employment').append("<h2 class='dark-subhead'>"+json.careers.title+"</h2>");
  $.each(json.careers.careerNames,function(i, item){
    $('#employment').append("<p class='employer-list'>"+item+"</p>");
  })

  //create a table based on the data from the co-op table API data
  var x="<h2 class='light-subhead'>Co-Op Table</h2><div class='table-div' id='coop-table-div'><table id='co-op' class='tablesorter'><thead><tr class='table-head'><th>Employer <i class='fa fa-sort' aria-hidden='true'></i></th><th>Degree <i class='fa fa-sort' aria-hidden='true'></i></th><th>City <i class='fa fa-sort' aria-hidden='true'></i></th><th>Term <i class='fa fa-sort' aria-hidden='true'></i></th></tr></thead><tbody>"
  $.each(json.coopTable.coopInformation,function(i,item){
    x+="<tr><td>"+item.employer+"</td><td>"+item.degree+"</td><td>"+item.city+"</td><td>"+item.term+"</td></tr>";
  })
  x+="</tbody></table></div>";
  $('#map').append(x);
  //add the sticky table header function and the table sorter functino plugins
  $("#co-op").tablesorter();
  $('#co-op').stickyTableHeaders({scrollableArea: $('#coop-table-div')});

  //create a table based on the data from the employment table API data
  var y="<h2 class='light-subhead'>Employment Table</h2><div class='table-div' id='emp-table-div'><table id='emp' class='tablesorter'><thead><tr class='table-head'><th>Employer <i class='fa fa-sort' aria-hidden='true'></i></th><th>Degree <i class='fa fa-sort' aria-hidden='true'></i></th><th>City <i class='fa fa-sort' aria-hidden='true'></i></th><th>Start Date <i class='fa fa-sort' aria-hidden='true'></i></th></tr></thead><tbody>"
  $.each(json.employmentTable.professionalEmploymentInformation,function(i,item){
    y+="<tr><td>"+item.employer+"</td><td>"+item.degree+"</td><td>"+item.city+"</td><td>"+item.startDate+"</td></tr>";
  })
  y+="</tbody></table></div>";
  $('#map').append(y);
  //add the sticky table header function and the table sorter functino plugins
  $("#emp").tablesorter();
  $('#emp').stickyTableHeaders({scrollableArea: $('#emp-table-div')});
});

  //loop through the faculty content to create a grid of faculty members
  //add to the people section
  myXhr('get',{path:'/people/faculty/'},'#people').done(function(json){
    $.each(json.faculty,function(i, item){
        $('#faculty-grid').append("<div class='card-flip'><div class='front'><div class='fac-pic' style='background-image:url("+item.imagePath+")'></div><h2 class='degree-title'>"+item.name+"</h2></div><div class='back'><p class='degree-desc'><i class='fa fa-envelope-o' aria-hidden='true'></i>"+" "+item.office+"</p><br /><p class='degree-desc'><i class='fa fa-building-o' aria-hidden='true'></i>"+" "+item.office+"</p><br /><p class='degree-desc'><i class='fa fa-phone' aria-hidden='true'></i>"+" "+item.phone+"</p></div></div>");
  })
  $(".card-flip").flip({forceHeight:true,forceHeight:true,autoSize:false});
});

//loop through the staff content to create a grid of staff members
//add to the people section
myXhr('get',{path:'/people/staff/'},'#people').done(function(json){
  $.each(json.staff,function(i, item){
      $('#staff-grid-content').append("<div class='card-flip'><div class='front'><div class='fac-pic' style='background-image:url("+item.imagePath+")'></div><h2 class='degree-title'>"+item.name+"</h2></div><div class='back'><p class='degree-desc'><i class='fa fa-envelope-o' aria-hidden='true'></i>"+" "+item.office+"</p><br /><p class='degree-desc'><i class='fa fa-building-o' aria-hidden='true'></i>"+" "+item.office+"</p><br /><p class='degree-desc'><i class='fa fa-phone' aria-hidden='true'></i>"+" "+item.phone+"</p></div></div>");
})
$(".card-flip").flip({forceHeight:true,forceHeight:true,autoSize:false});
});

//create a grid of research by faculty
//buttons will open up as dialog popups for each category
myXhr('get',{path:'/research/byFaculty/'}, '#research-grid').done(function(json){
$.each(json.byFaculty,function(i,item){
  $('#research-grid').append("<a href='#"+item.username+"-popup' class='open-popup-link'>"+item.facultyName+"</a><p><div id='"+item.username+"-popup' class='white-popup mfp-hide'>"+item.citations+"</div></p>");
})

$('.open-popup-link-contact').magnificPopup({
type:'inline',
midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
});
});

//add in the iframe for the contact form and create a button that will open the form in a popup
  $('#contact-form').append("<a href='#contact-form-popup' class='open-popup-link-contact'>Contact Form</a><div id='contact-form-popup' class='white-popup mfp-hide'><iframe src='https://ist.rit.edu/api/contactForm/' id='contact-form-id'> <p>Your browser does not support iframes.</p></iframe></div>");

$('.open-popup-link').magnificPopup({
type:'inline',
midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
});

//create a grid of research by faculty
//buttons will open up as dialog popups for each category
myXhr('get',{path:'/research/byInterestArea/'}, '#interest-grid').done(function(json){
$.each(json.byInterestArea,function(i,item){

  var area = item.areaName.replace(' ','_');
  $('#interest-grid').append("<a href='#"+area+"-popup' class='open-popup-link'>"+item.areaName+"</a><p><div id='"+area+"-popup' class='white-popup mfp-hide'>"+item.citations+"</div></p>");
})

$('.open-popup-link').magnificPopup({
type:'inline',
midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
});
});

//add in the resources for each section
myXhr('get',{path:'/resources/studyAbroad/'},'#study-abroad').done(function(json){
  $('#study-abroad').append("<h2 class='light-heading'>"+json.studyAbroad.title+"</h2><p class='light-body'>"+json.studyAbroad.description+"</p>");
});

myXhr('get',{path:'/resources/studyAbroad/places'},"#study-abroad").done(function(json){
  $.each(json.places, function(i,item){
    $("#study-abroad").append("<h2 class='light-subhead'>"+item.nameOfPlace+"</h2><p class='light-body'>"+item.description+"</p>");
  })

});

myXhr('get',{path:'/resources/studentServices'},"#student-services").done(function(json){
  $('#student-services').append("<h2 class='light-heading'>"+json.studentServices.title+"</h2>");
});

myXhr('get',{path:'/resources/studentServices/academicAdvisors'},"#student-services").done(function(json){
  $("#student-services").append("<h2 class='light-subhead'>"+json.academicAdvisors.title+"</h2><p class='light-body'>"+json.academicAdvisors.description+"</p>");
});

myXhr('get',{path:'/resources/studentServices/academicAdvisors/faq'},"#student-services").done(function(json){
  $("#student-services").append("<a href='"+json.faq.contentHref+"'>"+json.faq.title+"</a>");
});

myXhr('get',{path:'/resources/studentServices/professonalAdvisors'},"#student-services").done(function(json){
  var x="<h2 class='light-subhead'>"+json.professonalAdvisors.title+"</h2>";
  x+="<table><thead><tr><th>Name</th><th>Department</th><th>Email</th></tr></thead><tbody>"
  $.each(json.professonalAdvisors.advisorInformation, function(i,item){
    x+="<tr><td>"+item.name+"</td><td>"+item.department+"</td><td>"+item.email+"</td></tr>"
  })
  x+="</tbody></table>"
  $("#student-services").append(x);
});

myXhr('get',{path:'/resources/studentServices/facultyAdvisors'},"#student-services").done(function(json){
  var x="<h2 class='light-subhead'>"+json.facultyAdvisors.title+"</h2><p class='light-body'>"+json.facultyAdvisors.description+"</p>";
  $("#student-services").append(x);
});


myXhr('get',{path:'/resources/studentServices/istMinorAdvising'},"#student-services").done(function(json){
  var x = "<table><thead><tr><th>Name</th><th>Department</th><th>Email</th></tr></thead><tbody>"
  $.each(json.istMinorAdvising.minorAdvisorInformation, function(i,item){
    x+="<tr><td>"+item.title+"</td><td>"+item.advisor+"</td><td>"+item.email+"</td></tr>"
  })
  x+="</tbody></table>";
  $("#student-services").append(x);
});

myXhr('get',{path:'/resources/tutorsAndLabInformation/'},"#tutors-and-lab-info").done(function(json){
  $("#tutors-and-lab-info").append("<h2 class='light-heading'>"+json.tutorsAndLabInformation.title+"</h2><p class='light-body'>"+json.tutorsAndLabInformation.description+"</p><a href='"+json.tutorsAndLabInformation.tutoringLabHoursLink+"'>Tutoring Hours Link</a>");
});

myXhr('get',{path:'/resources/studentAmbassadors/'},"#student-ambassadors").done(function(json){
  $("#student-ambassadors").append("<h2 class='light-heading'>"+json.studentAmbassadors.title+"</h2>");
  $.each(json.studentAmbassadors.subSectionContent, function(i,item){
    $("#student-ambassadors").append("<h2 class='light-subhead'>"+item.title+"</h2><p class='light-body'>"+item.description+"</p>");
  })
});

myXhr('get',{path:'/resources/forms/'},"#forms").done(function(json){
  $("#grad-forms").before("<h2 class='light-heading'>Forms</h2>");
  $("#grad-forms").before("<h2 class='light-subhead'>Graduate Forms</h2>");
});

myXhr('get',{path:'/resources/forms/'},"#grad-forms").done(function(json){
  $.each(json.forms.graduateForms, function(i,item){
    $("#grad-forms").append("<li><a href='"+item.href+"'>"+item.formName+"</a></li>");
  })
});

myXhr('get',{path:'/resources/forms/'},"#undergrad-forms").done(function(json){
  $("#grad-forms").after("<h2 class='light-subhead'>Undergraduate Forms</h2>");
  $.each(json.forms.undergraduateForms, function(i,item){
    $("#undergrad-forms").append("<li><a href='"+item.href+"'>"+item.formName+"</a></li>");
  })
});

myXhr('get',{path:'/resources/coopEnrollment/'},"#coopEnrollment").done(function(json){
  $("#coopEnrollment").append("<h2 class='light-heading'>"+json.coopEnrollment.title+"</h2>");
  $.each(json.coopEnrollment.enrollmentInformationContent, function(i,item){
    $("#coopEnrollment").append("<h2 class='light-subhead'>"+item.title+"</h2><p class='light-body'>"+item.description+"</p>");
  })
});

//add in the news data based on yearly and older content
myXhr('get',{path:'/news/'},"#news").done(function(json){
  $.each(json.year, function(i,item){
    $("#year-content").append("<h2 class='dark-subhead'>"+item.title+"</h2><p class='dark-copy'>"+item.date+"</p>");

    if(item.description != null){
      $("#year-content").append("<div class='read-more-div'><p class='dark-copy'>"+item.description+"</p></div>");
    }
  })
  //read in plugin will truncate longer lists and will open when clicked on
  $('.read-more-div').readmore({
  speed: 75,
  lessLink: '<a href="#">Read less</a>',
  collapsedHeight: 50
  });
});

myXhr('get',{path:'/news/'},"#news").done(function(json){
  $.each(json.older, function(i,item){
    $("#older-content").append("<h2 class='dark-subhead'>"+item.title+"</h2><p class='dark-copy'>"+item.date+"</p>");

    if(item.description != null){
      $("#older-content").append("<div class='read-more-div'><p class='dark-copy'>"+item.description+"</p></div>");
    }
  })
});

//add in the social links to the footer
myXhr('get',{path:'/footer/'},"#contact").done(function(json){
  $("#social").append("<h2 class='light-subhead'>"+json.social.title+"</h2>");
  $("#social").append("<a href='"+json.social.twitter+"'><i class='fa fa-twitter fa-2x' aria-hidden='true'></i></a>");
  $("#social").append("<a href='"+json.social.facebook+"'><i class='fa fa-facebook fa-2x' aria-hidden='true'></i></a>");
});

//add the contact information and quick links in the footer
myXhr('get',{path:'/footer/'},"#contact").done(function(json){
  $.each(json.quickLinks, function(i,item){
    $("#quick-links").append("<a href='"+item.href+"'>"+item.title+"</a>")
  })
});

//add the copyright info into the footer
myXhr('get',{path:'/footer/'},"#copyright").done(function(json){
  $("#copyright").append("<p class='light-body'>"+json.copyright.html+"</p>");
});



});

//reference the proxy to use json data
function myXhr(t, d, id){
  return $.ajax({
    type:t,
    url:'proxy.php',
    dataType:'json',
    data:d,
    cache:false,
    async:true,
    beforeSend:function(){
    }
  }).always(function(){
  }).fail(function(){
  });
}
