$(document).ready(function(){
	$('.styler').styler();

	$(".phone-input").mask("+7 (999) 999-99-99");

	//tabs
	$('.tab-btn').click(function(e){
		e.preventDefault();
		var $tab = $(this).attr("href"); 		
		$(this).addClass('active');
		$(this).closest('.tab-block').find('.tab-btn').not(this).removeClass('active');		
		$(this).closest('.tab-block').find('.tab-item').removeClass('active');      
		$($tab).addClass('active');			
	});

	$('.product-slider-nav').slick({
		arrows:true,
		dots:false,
		asNavFor:'.product-slider',
		slidesToShow:4,
		slidesToScroll:1,
		prevArrow: '<a href="#" class="slick-prev slick-arrow"><span class="icon_slider_arrow_left"></span></a>',
		nextArrow: '<a href="#" class="slick-next slick-arrow"><span class="icon_slider_arrow_right"</span></a>',
		focusOnSelect: true,
		responsive: [		
			{			
				breakpoint: 1023,
				settings: {
					slidesToShow:3,					
				}
			},
			{			
				breakpoint: 767,
				settings: {
					slidesToShow:4,					
				}
			},
			{			
				breakpoint: 567,
				settings: {
					slidesToShow:3,					
				}
			},
			{			
				breakpoint: 480,
				settings: {
					slidesToShow:2,					
				}
			},
		]
	});

	$('.product-slider').slick({
		arrows:false,
		dots:false,
		asNavFor:'.product-slider-nav',
		slidesToShow:1,
		slidesToScroll:1,
	})

	$('.catalog-slider').slick({
		arrows:true,
		dots:false,		
		slidesToShow:4,
		slidesToScroll:1,
		prevArrow: '<a href="#" class="slick-prev slick-arrow"><span class="icon_slider_arrow_left"></span></a>',
		nextArrow: '<a href="#" class="slick-next slick-arrow"><span class="icon_slider_arrow_right"</span></a>',		
		responsive: [		
			{			
				breakpoint: 1023,
				settings: {
					slidesToShow:3,					
				}
			},
			{			
				breakpoint: 767,
				settings: {
					slidesToShow:2,					
				}
			},
			{			
				breakpoint: 567,
				settings: {
					slidesToShow:1,					
				}
			},			
		]
	});

	//modal
	$('.modal-btn').click(function(e){
		e.preventDefault();

		$('.modal').removeClass('active');		
		$('.modal').fadeOut(0);

		var src=$(this).attr('href');
		var mHeight=$(src).innerHeight();
		var mWidth=$(src).innerWidth();
		$(src).fadeIn(0);
		$(src).addClass("active");
		$('#overlay').fadeIn(200);
		
		$(src).css({"margin-top":mHeight/-2});	
		$(src).css({'margin-left':mWidth/-2,});	
	});

	$('.modal__close, #overlay').click(function(e){
		e.preventDefault();
		modalClose();
	});

	$(window).resize(function(){
		var src=$('.modal');
		mHeight=$(src).innerHeight(),       
		mWidth=$(src).innerWidth(), 
		marginTop=mHeight/2*(-1),
		marginLeft=mWidth/2*(-1),
		
		$(src).css({
			"margin-top":marginTop,
			"margin-left":marginLeft,
		});
	})

	//basic dropdown
	$('.dropdown-btn').click(function(e){
		e.preventDefault();
		$(this).toggleClass('active').siblings(".dropdown").slideToggle(300);
		$('.dropdown-btn').not(this).removeClass('active').siblings(".dropdown").slideUp(300);
	})

	//price range
	$( "#catalog__price-range" ).slider({
      range: true,
      min: 0,
      max: 99999,
      values: [ 500, 50000 ],
      slide: function( event, ui ) {
        $( ".amount-min input" ).val("" + ui.values[ 0 ]);
		$( ".amount-max input" ).val("" + ui.values[ 1 ]);
      }
    }); 

	$( ".amount-min input" ).on( "change", function() { 
		var val = $(this).val();    
      	$( "#catalog__price-range").slider('values',0,val)
    });

    $( ".amount-max input" ).on( "change", function() { 
		var val = $(this).val();    
      	$( "#catalog__price-range").slider('values',1,val)
    });

    $( ".amount-min input" ).val( "" + $( "#catalog__price-range" ).slider( "values", 0 ));    
	$( ".amount-max input" ).val( "" + $( "#catalog__price-range" ).slider( "values", 1 ));	
	//price range END
});

function modalClose (){
	$('.modal').removeClass('active');
	$('.modal').css({"margin-top":'0'});	
	$('.modal').css({'margin-left':'0',});
	$('#overlay').fadeOut(200);
	$('.modal').fadeOut(0);	
}