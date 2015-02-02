
        
                var Product = Backbone.Model.extend({
                           defaults: {
                                name: ''
                           }
                         });
                var ProductBasket = Backbone.Collection.extend({model:Product});
 
            
        

                var BasketView = Backbone.View.extend({
                
                el: '.list',
                tpl: '<table class="table table-hover table-bordered table-condensed"><tr><th >Item</th><th>Quantity</th><th></th></tr><tr><td ><p id="product-name"> Soap </p></td><td> <p  id="basket-Soap">0</p></td><td >  <input type="button" id="Soap" value="Add" class="btn btn-primary"/>    </td></tr> <tr><td ><p id="product-name"> Pen </p></td><td> <p  id="basket-Pen">0</p></td><td >  <input type="button" id="Pen" value="Add" class="btn btn-primary"/>    </td></tr>   </table>  ',
                 
                    initialize: function(){
                               this.prods= new ProductBasket();
                               this.catalog = new ProductBasket([{name:'Soap'},{name:'Pen'}]);
                               this.render();
                               this.listenTo(this.prods,"add",this.renderAdd);
                    },

                      render : function () {           
                              var template = _.template(this.tpl);   
                              $(this.el).html(template);
                              this.renderCatalog();
                             },

                      renderCatalog : function () {           
                              //var template = _.template(this.tpl);   
                             // $(this.el).html(template);
                             },
                       events: {
                                   "click input[type=button]": "addToBasket"
                                 },

                        renderAdd: function(event){
                                  x=event.get('name');
                                  this.$("#basket-"+x).html(this.prods.where({name: x}).length);
                                 },

                        addToBasket: function(event){
                                   var selectedProduct = this.catalog.findWhere({name: event.target.id});
                                   this.prods.push(selectedProduct.clone());
                                    }

                    });  
 
                
               var basketView = new BasketView();
                 Backbone.history.start();
        
