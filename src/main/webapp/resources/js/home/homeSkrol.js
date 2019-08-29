var skroll = new Skroll()
			
			.add(".anim7",{
				animation:"spinIn",
				delay:80,
				duration:500,
				easing:"cubic-bezier(0.37, 0.27, 0.24, 1.26)"
			})
			
			.init();
			$(window).load(function(e){
				skroll.recalcPosition();
			})
			setInterval(function(){
				skroll.recalcPosition();
			},2000);
			
			
