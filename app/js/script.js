// JavaScript Document
jQuery(function($){
	$.datepicker.regional['fr'] = {
		closeText: 'Fermer',
		prevText: '&#x3c;Préc',
		nextText: 'Suiv&#x3e;',
		currentText: 'Aujourd\'hui',
		monthNames: ['Janvier','Fevrier','Mars','Avril','Mai','Juin',
		'Juillet','Aout','Septembre','Octobre','Novembre','Decembre'],
		monthNamesShort: ['Jan','Fev','Mar','Avr','Mai','Jun',
		'Jul','Aou','Sep','Oct','Nov','Dec'],
		dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
		dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
		dayNamesMin: ['Di','Lu','Ma','Me','Je','Ve','Sa'],
		weekHeader: 'Sm',
		dateFormat: 'dd-mm-yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: '',
		minDate: 0,
		maxDate: '+12M +0D',
		numberOfMonths: 1,
		minDate: new Date(1930,0,1), 
		maxDate: new Date(2010,12,1), 
		yearRange: '1910:2010' ,
		changeMonth: true,
		changeYear: true
		
		};
	$.datepicker.setDefaults($.datepicker.regional['fr']);
});

$(function (){
	
	$( "#datepicker" ).datepicker(); //datepicker
	var availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
/*    $( "#tags" ).autocomplete({
      source: availableTags,
		minLength :2
    }); // autocomplete => tout les mots possedant les lettres */
	
	$( "#tags" ).autocomplete({
  source: function( request, response ) {
          var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
          response( $.grep( availableTags, function( item ){
              return matcher.test( item );
          }) ); 
      },
		minLength:2
}); //autocomplete  => Commence par la lettre recherchée
	
	///////////////////////////////////////////////////////////////////////////////////////////////////
	
	$.ajax({
				url : "../json/cities.json",
				method : "GET",
				dataType : "json",
				success : function(monObjet){
					
					//console.log(monObjet[0] .name+"/"+monObjet[0] .zip);
				var villes = []	;
				for(i=0; i<monObjet.length; i++)	
				{	
					var obj ={};
					
					obj["value"] = monObjet[i].zip;						   // clé + valeur
					obj["label"] = monObjet[i].zip+" "+monObjet[i].name;
					obj["ville"] = monObjet[i].name;
					
					villes.push(obj);
				
				}//for
					
					console.log(villes);
					
					   $( "#cp" ).autocomplete({
						   		source: function( request, response ) {
								var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
								response( $.grep( villes, function( item ){
								return matcher.test( item.label );
          }) );
      },
						   
						   select: function(event, ui){
							   $("#ville").val(ui.item.ville);
						   }

					   }); //cp
					
				}// success
	
	}); //ajax
	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
$('#form').validetta({
  onValid : function( event ) {
    event.preventDefault(); // Will prevent the submission of the form
   
 
 // ici faire la requête ajax
var donnees = $("#form").serialize();	  
 $.ajax({
   	 // 1) on définit le fichier vers lequel on envoye la requête POST
       url : 'php.php',
	
	// 2/ on spécifie la méthode  
       type : 'POST', // Le type de la requête HTTP, ici  POST
    
	// 3) on définit les variables POST qui sont ennvoyées au fichier .php qui les récupère sous forme de $_POST["nom"] 
	  data : donnees, // On fait passer nos variables au script coucou.php
     
	 // 4) format de retour du fichier php dans "data"
	   dataType : 'html',
	   
	   // 5) fonction à effectuer en cas de succès
	   success : function(data){ //  contient le HTML renvoyé
        
		
		$('#contenu').html(data);  
		  $('#form').hide(); 
	   
	   } // success
   
   
   }); // $.ajax function

 
 }, // valid

  
  
  display : 'bubble',
  errorClass : 'validetta-error',
  /** Same for valid validation */
  validClass : 'validetta-valid', // Same for valid validation
  bubblePosition: 'right', // Bubble position // right / bottom
  bubbleGapLeft: 15, // Right gap of bubble (px unit)
  bubbleGapTop: 0, // Top gap of bubble (px unit)
  /* To enable real-time form control, set this option true. */
  realTime : false
  
});
	
	//////////////////////////////////////////////////////////////////////////////////////////////////
	
	$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});

$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});
	
	
}); //function principal