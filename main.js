            var container;
            var camera, scene, renderer;
            var mouseX = 0, mouseY = 0;
            var windowHalfX = window.innerWidth / 2;
            var windowHalfY = window.innerHeight / 2;
            var object;
            var material = new THREE.MeshBasicMaterial();
            
            
            var camDim = [250,0,0];
            
            init();
            animate();
            function init() {
                container = document.createElement( 'div' );
                document.body.appendChild( container );
                


                //WINDOW RESIZE
                function onWindowResize( event ) {
                    renderer.setSize( window.innerWidth, window.innerHeight );
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                }
                
                // CAMERA
                camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
                camera.position.z = camDim[0];
                camera.position.x = camDim[1];
                camera.position.y = camDim[2];
                //camera.rotation.y = 250;
                
                
                //SCENE
                scene = new THREE.Scene();
                var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
                scene.add( ambientLight );
                var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
                camera.add( pointLight );
                scene.add( camera );
                
                
                //CONTROLS
                var controls = new THREE.OrbitControls(camera, renderer);
                controls.enableDamping = false;
                controls.dampingFactor = 0.25;
                controls.enableZoom = false;
                controls.update();
                
                //RENDER 
                renderer = new THREE.WebGLRenderer({alpha:true});
                renderer.setPixelRatio( window.devicePixelRatio );
                renderer.setSize( window.innerWidth, window.innerHeight );
                container.appendChild( renderer.domElement );
                //
                window.addEventListener( 'resize', onWindowResize, false );
                
                //LOAD OBJECT JSON
                
                var loader = new THREE.ObjectLoader();
                
                for ( var i = 0; i < 1; i++ ) {
                    loader.load( "lambo.json", function(object){
                    //object.scale.set(1, 1, 1);
                    object.position.set(0, 0, 0);
                    
                    object.position.x = 0;
                    object.position.y = -20;
                    object.position.z = 0;
                    //object.rotation.x = Math.random() * 1000 - 500;
                    //object.rotation.y = 15.5;
                    object.rotation.y = Math.random() * 1000 - 500;
                    //object.rotation.z = Math.random() * 1000 - 500;
                    object.scale.x = object.scale.y = object.scale.z = .39;

                    
                    object.traverse(function(child) {
                        if(child instanceof THREE.Mesh) {
                            child.material = material;
                        }
                    })

                    
                    var loader = new THREE.TextureLoader();

                        loader.load("Lamborginhi Aventador_Diffuse-1.jpg", function(texture) {
                        // Apply texture to material.
                        material.map = texture;
                        // Maybe this is needed.
                        material.needsUpdate = true;
                        scene.add(object);
                    })

                        var loader = new THREE.TextureLoader();

                      
                        
                    
                    var animate = function () {
                        requestAnimationFrame( animate );
                        //object.rotation.y += 0.002;
                        
                        var time = performance.now() * 0.0001;
                        //object.position.y = Math.sin( time ) * 70 + 5;
                        //object.position.y = Math.sin( time ) * 1000 - 500;
                        //object.position.y = Math.random();
                        object.rotation.y += 0.002;
                        //camera.rotation.x += .00002;
                        //object.position.z += -2;
                        //renderer.render(scene, camera);
                    };
                    

                    animate();
 
                });
                }
                
                
                
            }
            //end function
            
            
            function animate() {
                requestAnimationFrame( animate );
                render();
            }
            

            
            //RENDER
            function render() {
                 
                renderer.render( scene, camera );
            }