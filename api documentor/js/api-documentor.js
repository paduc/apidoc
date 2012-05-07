
//
// Api Documentor
// by @paduc
//

/*
	Usage:
	var AD = new ApiDocumentor({
      section_template: $('#section-template').html(),
      action_template: $('#action-template').html(),
      example_template: $('#example-template').html(),
      target: $(".main"),
      generateSummary: true,
      summaryTarget: $('.api-summary')
    });

    AD.fetch('scheme.json');
*/

var ApiDocumentor = function(options){
	
	// integrate the options
	options && _.extend(this,options);

	this.fetch = function(url){
		
		if(url){
			$.ajax({
		      url: url,
		      context: this,
		      success: function(value){
		       this.model = value;
		       this.render();
		      }
		    });
		}
		else console.log("No schemaUri specified, try ApiDocumentor.fetch('/scheme.json').");
		
	};
	
	this.render = function(){

    // make sure the templates are set
    if(!(this.section_template && this.action_template && this.example_template)){
    	console.log("Missing templates. Dont forget to set section_template, action_template and example_template");
    	this.section_template || console.log("missing section");
    	this.action_template || console.log("missing action");
    	this.example_template || console.log("missing example");
    	return;
    }

    // make sure the target is set
    if(!this.target){
    	console.log("Missing the target. Don't forget to set target.");
    	return;
    }

    // main section template
    var section_template = _.template(this.section_template);
    
    // inner templates
    var inner_templates = {};
    inner_templates.action_template = _.template(this.action_template);
    inner_templates.example_template = _.template(this.example_template);

    // insert the sections one by one
    $target = this.target;
    this.model && this.model.sections && _.each(this.model.sections, function(section){
      $target.append(section_template({section: section,templates: inner_templates}));
    });

    // once everything is drawn, create the summary
    if(this.generateSummary) this.renderSummary();

    // activate response/payload examples (dynamic loading)
    this.activateExamples();

    // color what needs to be colored
    $('.uncolored code').each(function(){
    	$this = $(this);
     	Rainbow.color($this.html(),'javascript',function(colored){ $this.html(colored); } ); 
 	  });

  };

  this.renderSummary = function() {

  	if(!this.summaryTarget){
  		console.log("Api-Documentor.js: can't find summaryTarget");
  		return;
  	}

  	// Create a list and append it to the target
  	this.summaryTarget.append('<ul class="section-list"></ul>');
  	var section_list = this.summaryTarget.find('.section-list');

  	// Add each section to the summary
  	this.model && this.model.sections && _.each(this.model.sections, function(section){
		
			// get the title from the <div class=title></div>
	    var section_title = section.title;

	    // create an anchor uri for this section
	    var section_uri = encodeURI(section_title.replace(" ","_"));

	    // create the html elements for the section
	    var section_el = $("<li><a href=#"+section_uri+">"+section_title+"</a><div class=clearfix></div><ul class=action-titles></ul><ul class=end-points></ul></li>");

	    // Add the html element to the api list element
	    section_list.append(section_el);	

			section.actions && (section.actions.length > 0) && _.each(section.actions, function(action){

	      var action_title = action.title;
	      var action_uri = encodeURI(action_title.replace(" ","_"));

	      // add a link in the end-points list
	      section_el.find('.end-points').append("<li><a href='#"+action_uri+"'>"+action.method+" "+action.uri+"</a></li>");

	      // add a link in the action-titles list
	      section_el.find('.action-titles').append("<li><a href='#"+action_uri+"'>"+action.title+"</a></li>");

	    });

   	});
  }

  this.activateExamples = function(){

  	//
    // listen for click events on the examples
    //
  	// Open / close the json example
		this.target && this.target.on("click",".example-response.loaded",function(){
			$(this).toggleClass("open");
		});

		// Load the json fixture
		this.target && this.target.on("click",".example-response.unloaded",function(){

		  $this = $(this);

		  this.code_el = $this.find('code');
		  
		  // get the fixture uri for the data-fixture attribute in the <code> element
		  var fixture_uri = this.code_el.data('fixture');
		  
		  if(fixture_uri){

		    // fetch the fixture uri
		    $.ajax({
		      url: fixture_uri,
		      dataType: "html", // we do not want the JSON to be parsed before display
		      context: this, // set the context for the async callbacks
		      success: function(value){

		        // insert a highlighted version of the json
		        Rainbow.color(value, 'javascript', (function(_this){ return function(highlighted_code){
		          _this.code_el.html(highlighted_code);
		        }; })(this));

		        // remember that this fixture has been loaded
		        $this.removeClass('unloaded');
		        $this.addClass('loaded');
		      },
		      error: function(){
		        window.alert("Can't load "+fixture_uri);
		      }
		    });

		  }

		});
  }

  //
  // Extract the scheme from a html file
  //
  // function extractScheme() {

  //     var scheme = {
  //       sections: []
  //     };

  //     $('.section').each(function(){

  //       console.log("found section");

  //       var section = {
  //         title: $(this).find(".title").html(),
  //         actions: []
  //       };

  //       // Get all the action from the section
  //       var actions = $(this).find(".action");
        
  //       // if there are actions in this section
  //       if(actions.length > 0){

  //         // for each action, add it in this section's list
  //         actions.each(function(){
  //           $this = $(this);
  //           var req_title = $this.find(".request > .title").html();

  //           var action = {
  //             title: $this.find(".description > .title").html(),
  //             description: $this.find(".description > .more-info").html(),
  //             uri: req_title.substring(req_title.indexOf(' ')),
  //             method: req_title.substring(0,req_title.indexOf(' ')),
  //             authentication: false,
  //             params: [],
  //             errors: [],
  //             examples: []
  //           };


  //           // Extract params and errors
  //           var params_el = $this.find(".description > ul.parameters");
  //           if(params_el){
  //             // First one is parameters
  //             var parameters = params_el.first().find('li');
  //             parameters.each(function(){
  //               action.params.push({
  //                 id: $(this).find('.name').html(),
  //                 description: $(this).find('.description').html() || ""
  //               });
  //             });

  //             // second one is errors
  //             var errors = params_el.next().find('li');
  //             errors && errors.each(function(){
  //               actions.errors.push({
  //                 code: $(this).find('.name').html(),
  //                 description: $(this).find('.description').html() || ""
  //               });
  //             });
  //           }

  //           section.actions.push(action);


  //         });



  //       }
  //       scheme.sections.push(section);
  //     });

  //     console.log(JSON.stringify(scheme));
  //   }
    
};