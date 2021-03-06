//	arboreal.controller.portal.js
//	Evadne Wu at Iridia, 2010

	"use strict";





arboreal.controller = arboreal.controller || {};





arboreal.controller.blog = new JS.Singleton(arboreal.controller.archetype, {





//	!Configuration & Initializer

	configure: function() {
	
		this.bindings = {
	
			blogNewCommentButton: $("#newComment"),
			blogCommentForm: $(".commentForm"),
			blogCommentList: $(".context + .comments"),
			
			blogNavigationToggle: $("#blogNavigationToggle"),
			blogNavigationWrapper: $("#blogNavigation"), 
			blogNavigationContainer: $("#blogNavigation > div"),
			
			blogArticleSharingToggle: $(".context article header .actions .share"),
			blogSingleArticleSharingDestinationsWrapper: $(".context article header section.share"),
			blogSingleArticleSharingDestinationElementSelectorString: "li",
			
			blogArticleImages: $(".context article article > * img")
		
		};
		
	},

	initializePage: function () {
	
		this.initializeNavigationPredicate();
		this.initializeCommentForm();
		this.initializeArticleSharingDestinations();
		
		this.wrapArticleImages();
		
	},
	




//	!Navigation Predicate

	initializeNavigationPredicate: function() {
	
		var thisObject = this;
	
		this.bindings.blogNavigationToggle.toggle(function() {
			
			thisObject.bindings.blogNavigationWrapper.toggleClass("active");
			thisObject.bindings.blogNavigationToggle.animate({opacity: 1}, 50).toggleClass("active");
			thisObject.bindings.blogNavigationContainer.slideToggle(350);
		
		}, function() {
			
			thisObject.bindings.blogNavigationToggle.toggleClass("active");
			thisObject.bindings.blogNavigationContainer.slideToggle(350, function() {
			
				thisObject.bindings.blogNavigationWrapper.toggleClass("active");
				
			});
		
		});
		
	},
	
	
	
	
	
//	!Comment Form

	initializeCommentForm: function() {
		
		var thisObject = this;
	
		thisObject.bindings.blogNewCommentButton.toggle(function() {
	
			thisObject.bindings.blogCommentList.addClass("backdropped");
			thisObject.bindings.blogNewCommentButton.addClass("active");
			thisObject.bindings.blogCommentForm.removeClass("hiddenCommentForm");
			
		}, function() {
	
			thisObject.bindings.blogCommentList.removeClass("backdropped");
			thisObject.bindings.blogNewCommentButton.removeClass("active");
			thisObject.bindings.blogCommentForm.addClass("hiddenCommentForm");
			
		});
		
	},
	
	
	
	
	
//	!Article Sharing

	initializeArticleSharingDestinations: function() {
	
		var thisObject = this;
	
		thisObject.bindings.blogArticleSharingToggle.toggle(function() {
	
			$(this).addClass("active").animate({dummy: 1}, 750, function() {
			
				$(this).addClass("active").addClass("fastAnimation").addClass("disclosed");
				
			});
			
			$(this).closest("header").find("section.share").addClass("active").find("ul").stop(true, true).hide().slideDown(500, function() {
				
				$(this).parent().addClass("active");
				
			});
			
		}, function() {
		
			$(this).removeClass("disclosed").animate({dummy: 1}, 5, function() {
			
				$(this).removeClass("disclosed").removeClass("fastAnimation").removeClass("active");
				
			});
		
			$(this).closest("header").find("section.share").find("ul").stop(true, true).slideUp(500, function() {
			
				$(this).parent().removeClass("active");
				
			});
	
		});
		
		
		thisObject.bindings.blogSingleArticleSharingDestinationsWrapper.find(
		
			thisObject.bindings.blogSingleArticleSharingDestinationElementSelectorString
			
		).each(function (index, object) {
	
			$(this).hover(function() {
			
				$(this).closest("section.share").addClass($(this).attr("rel"));
				
			}, function() {
			
				$(this).closest("section.share").removeClass($(this).attr("rel"));
				
			});
			
		});
		
	},





//	!Blog Article Images

	wrapArticleImages: function() {
	
		this.bindings.blogArticleImages.each(function(index, imageElement) {
		
			var theElement = $(imageElement);
			
			mono.log("the element is", theElement, theElement.parent(), theElement.parent()[0]);
			
			if (theElement.parent()[0].tagName.match(/span/ig))
			if (theElement.parent().hasClass("wrapStrap"))
			return true;
			
			theElement.wrap($("<span>").addClass("wrapStrap"));
			
		//	if (theElement.parent()[0].tagName.match(/span/ig))
			
		//	$(".context article article > * img").eq(0).parent()[0].tagName
			
		});
		
	},

//	!Blog Comment Manipulation

	addBlogComment: function (authorName, authorAvatarURL, authorSiteURL, commentDate, commentDateRep, commentHTML) {
	
		var commentObject = $("<li></li>").append(
		
			$("<aside></aside>").append(
			
				$("<div></div>").addClass("avatar")
				
			).append(
			
				$("<h3></h3>").text(authorName).wrap(
				
					(typeof siteURL == undefined) ? "" : $("<a></a>").attr("href", authorSiteURL)
				
				)
			
			).append(
			
				$("<time></time>").attr("datetime", commentDate).text(commentDateRep)
			
			)
		
		).append(commentHTML);
		
		commentObject.appendTo("section.comments ul").slideUp(0).slideDown(125);
	
	}

});




