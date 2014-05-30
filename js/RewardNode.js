//  Copyright 2002-2014, University of Colorado Boulder

/**
 * Reward node that shows many nodes animating, for fun!  Shown when a perfect score is achieved in a game.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var StarNode = require( 'SCENERY_PHET/StarNode' );
  var FaceNode = require( 'SCENERY_PHET/FaceNode' );

  function RewardNode( options ) {
    options = _.extend( {

      layoutBounds: ScreenView.DEFAULT_LAYOUT_BOUNDS,
      nodes: _.shuffle( _.times( 100, function() {
          return new StarNode()
        } ).concat( _.times( 100, function() {

          //Create a smiling face.
          //NOTE: Would look better with black stroke, but that is somehow throwing off the positions
          return new FaceNode( 40, {headStroke: null} )
        } ) )
      )
    }, options );


    var children = options.nodes;
    var layoutBounds = options.layoutBounds;

    this.speeds = [];

    //randomly scatter children above the top of the screen
    for ( var i = 0; i < children.length; i++ ) {
      var child = children[i];
      child.bottom = layoutBounds.top - Math.random() * layoutBounds.height;
      child.centerX = Math.random() * layoutBounds.width + layoutBounds.left;

      this.speeds.push( Math.random() + 1 );
    }

    this.totalTime = 0;
    Node.call( this, {children: children} );

    this.mutate( options );
  }

  return inherit( Node, RewardNode, {
    step: function( elapsed ) {
      this.totalTime += elapsed;
      var children = this.children;
      var numChildren = children.length;
      for ( var i = 0; i < numChildren; i++ ) {
        var child = children[i];
//        child.rotate( Math.PI / 16 * elapsed );
        child.translate( 0, 1 * elapsed * 60 * this.speeds[i] );
      }
    }
  } );
} );