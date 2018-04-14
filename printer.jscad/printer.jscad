_nemaXYZ = 42
_XYrodsDiam = 8.2
_XYlmLength = 24.1
_XYlmDiam = 15.2
_globalResolution = 32
_ZrodsWidth = 106
_rodsSupportThickness = 3
_ZrodsDiam = 8.3
_ZlmDiam = 15.2
xrodOffset = 40;

function nemaHole(){
    var offset = (_nemaXYZ==35)?13:15.5;
        return union(
            cylinder({r:11.3,h:5}),
            cylinder({r:1.6,h:5}).translate([-offset,-offset,0]),
            cylinder({r:1.6,h:5}).translate([offset,-offset,0]),
            cylinder({r:1.6,h:5}).translate([-offset,offset,0]),
            cylinder({r:1.6,h:5}).translate([offset,offset,0])
        );
}

function roundBoolean2(diam,length,edge){
    var bool;
    if(edge=="bl"){bool = cylinder({r:diam,h:length}).rotateX(-90).translate([0,0,0]);}
    if(edge=="tl"){bool = cylinder({r:diam,h:length}).rotateX(-90).translate([0,0,diam]);}
    if(edge=="br"){bool = cylinder({r:diam,h:length}).rotateX(-90).translate([diam,0,0]);}
    if(edge=="tr"){bool = cylinder({r:diam,h:length}).rotateX(-90).translate([diam,0,diam]);}
    return difference(
        cube([diam,length,diam]),
        bool
    );
}

function motorXY(){
    var thickness = 5;
    var left = (_XYlmDiam/2) + 6;

    return difference(
	    union(
	        // base
        	cube({size:[left+_nemaXYZ,_nemaXYZ,thickness]}),
	        // wall support
	        cube({size:[6.9,_nemaXYZ-10,16]}).setColor(0.5,0.5,0.5),
	        //cube({size:[_nemaXYZ-11.3,5.5,16]}).setColor(0.5,0.5,0.5),
	        // rod support
            rod_holder().translate([0,_nemaXYZ-10,0])
    	),
	    nemaHole(_nemaXYZ).translate([left+_nemaXYZ/2,_nemaXYZ/2,0]),
	    // wood screw holes
	    cylinder({d:3.2,h:10}).rotateX(-90).rotateZ(90).translate([10,_nemaXYZ-12,11]),
    	cylinder({d:6.5,h:3,fn:6}).rotateX(-90).rotateZ(90).translate([7,_nemaXYZ-12,11]),
	    cylinder({d:3.2,h:10}).rotateX(-90).rotateZ(90).translate([10,12,11]),
	    cylinder({d:6.5,h:3,fn:6}).rotateX(-90).rotateZ(90).translate([7,12,11]),
        // chamfreins Y
        roundBoolean2(3,_nemaXYZ,"bl").rotateX(-90).translate([_nemaXYZ-3+left,_nemaXYZ-3,_nemaXYZ])
	).setColor([0,0.7,0]);
}

function motorXY_back(){
    var thickness = 5;
    var left = (_XYlmDiam/2) + 6;

    return difference(
	    union(
	        // base
        	cube({size:[left+_nemaXYZ,_nemaXYZ,thickness]}),
	        // wall support
	        cube({size:[7,_nemaXYZ-12,30]}).setColor(0.5,0.5,0.5),
	        cube({size:[7,_nemaXYZ-10,16]}).setColor(0.5,0.5,0.5),
	        cube({size:[35,9,30]}).setColor(0.5,0.5,0.5),
	        // rod support
            rod_holder().translate([0,_nemaXYZ-10,0])
    	),
	    nemaHole(_nemaXYZ).translate([left+_nemaXYZ/2,_nemaXYZ/2,0]),
	    cylinder({d:3.2,h:40}).translate([left+_nemaXYZ/2-15.5,_nemaXYZ/2-15.5,0]),
	    // wood screw holes
	    cylinder({d:3.2,h:10}).rotateX(-90).rotateZ(90).translate([10,25,25]),
    	cylinder({d:6.5,h:3,fn:6}).rotateX(-90).rotateZ(90).translate([7,25,25]),
	    cylinder({d:3.2,h:10}).rotateX(-90).rotateZ(90).translate([10,10,25]),
	    cylinder({d:6.5,h:10,fn:6}).rotateX(-90).rotateZ(90).translate([15,10,25]),
	    cylinder({d:3.2,h:10}).rotateX(-90).translate([13,0,25]),
	    cylinder({d:3.2,h:10}).rotateX(-90).translate([28,0,25]),
	    cylinder({d:6.5,h:3,fn:6}).rotateX(-90).translate([13,6,25]),
	    cylinder({d:6.5,h:3,fn:6}).rotateX(-90).translate([28,6,25]),
        // chamfreins Y
        roundBoolean2(3,_nemaXYZ,"bl").rotateX(-90).translate([_nemaXYZ-3+left,_nemaXYZ-3,_nemaXYZ])
	).setColor([0,0.7,0]);
}

function bearing608z(){
    return difference(
        cylinder({r:11,h:7}).setColor(0.4,0.4,0.4),
        cylinder({r:4,h:7})
    );
}

function rod_holder()
{
    return difference(
        union(
            cylinder({d:_XYrodsDiam+6,h:10}).rotateX(90).translate([(_XYlmDiam/2)+6,10,35/2]),
            //cube([_XYrodsDiam+6,10,35/2]).translate([(_XYlmDiam/2)+3-(_XYrodsDiam/2),0,0]),
            cube([_XYrodsDiam/2+_XYlmDiam/2+9,10,35/2]),
            cube([13,10,7.5]).translate([0,0,17])
        ),
	    cylinder({d:_XYrodsDiam,h:10}).rotateX(90).translate([(_XYlmDiam/2)+6,10,35/2]),
	    cube({size:[12,10,1]}).translate([0,0,16]),
	    cylinder({d:3.2,h:20.5}).translate([3.5,5,5.5]),
	    cube({size:[8.5,6,3.5]}).translate([0,2,9])
    );
}

function endstop_mount()
{
    return difference(
        cube({size:[26,10,14],center:[true,true,false]}),
        cube({size:[14,10,2],center:[true,true,false]}),
        cylinder({d:3.1,h:14}).translate([-9.65,0,0]),
        cylinder({d:3.1,h:14}).translate([9.65,0,0]),
        cylinder({d:8.1,h:10}).rotateX(-90).translate([0,-5,10]),
        cube({size:[7,10,4],center:[true,true,false]}).translate([0,0,10]),
        cube({size:[10,10,10],center:[true,true,false]}).translate([-11,0,4]),
        cube({size:[10,10,10],center:[true,true,false]}).translate([11,0,4]));
}

function bearingsXY(){
    var left = (_XYlmDiam/2) + 6;
    var Y = 40;
    var Z = 5;
    var bearingsOffsetZ = Z;
    var bearingsOffsetX = left + 14.5;
    var bearingHoleOffsetX = left + 21;
    var X = left + 30;
    mesh = difference(
        union(
            cube({size:[X,Y,Z]}),
            cube({size:[X,Y/2+8,3]}).translate([0,Y/2-8,16]),
            rod_holder(),
            // extra for touching the wall
            cube({size:[7,Y,16]}),
            cube({size:[X,7,16]}).translate([0,Y-7,0]),
            // round bearings supports in middle
            cylinder({d1:7,d2:5,h:1.1}).translate([bearingHoleOffsetX,(Y-4.5)/2,bearingsOffsetZ]),
            cylinder({d1:5,d2:7,h:1.1}).translate([bearingHoleOffsetX,(Y-4.5)/2,bearingsOffsetZ+9.9]),
            cylinder({d1:7,d2:5,h:1.1}).translate([bearingHoleOffsetX,(Y-4.5)/2,19])
        ),
        // long bearing hole
        cylinder({d:3.2,h:40}).translate([bearingHoleOffsetX,(Y-4.5)/2,0]),
        cylinder({d:6.5,h:3,fn:6}).translate([bearingHoleOffsetX,(Y-4.5)/2,0]),
        // chamfreins Y
        roundBoolean2(3,40,"tl").rotateX(-90).translate([X-3,0,40]),
        roundBoolean2(3,30,"tl").rotateX(-90).translate([X-3,Y/2-8,40]),
        // wood screw holes
    	cylinder({d:3.2,h:10}).rotateX(-90).rotateZ(90).translate([10,Y-10,11]),
	    cylinder({d:3.2,h:10}).rotateX(-90).rotateZ(90).translate([10,Y-25,11]),
	    cylinder({d:3.2,h:10}).rotateX(-90).translate([13,Y-10,11]),
	    cylinder({d:3.2,h:10}).rotateX(-90).translate([28,Y-10,11]),
	    cylinder({d:6.5,h:3,fn:6}).rotateX(-90).rotateZ(90).translate([7,Y-10,11]),
	    cylinder({d:6.5,h:3,fn:6}).rotateX(-90).rotateZ(90).translate([7,Y-25,11]),
	    cylinder({d:6.5,h:3,fn:6}).rotateX(-90).translate([13,Y-7,11]),
	    cylinder({d:6.5,h:3,fn:6}).rotateX(-90).translate([28,Y-7,11])
    );

    mesh = union(
        mesh.setColor([0,0.7,0])/*,
        GT2idler().translate([bearingHoleOffsetX,(Y-4.5)/2,bearingsOffsetZ+1]).setColor([0.7,0.7,0.7]),
        GT2idler().translate([bearingHoleOffsetX,(Y-4.5)/2,20.1]).setColor([0.7,0.7,0.7])*/
    );

    return mesh;
}

function bearingsXY_front(){
    var left = (_XYlmDiam/2) + 6;
    var Y = 45;
    var Z = 5;
    var bearingsOffsetZ = Z;
    var bearingsOffsetX = left + 14.5;
    var bearingHoleOffsetX = left + 21;
    var X = left + 26;
    mesh = difference(
        union(
            cube({size:[X,Y,Z]}),
            cube({size:[X,25,3]}).translate([0,Y-25,16]),
            rod_holder(),
            // extra for touching the wall
            cube({size:[7,Y-11,30]}).translate([0,11,0]),
            cube({size:[7,Y-10,16]}).translate([0,10,0]),
            cube({size:[X,7,30]}).translate([0,Y-7,0]),
            // round bearings supports in middle
            cylinder({d1:7,d2:5,h:1.1}).translate([bearingHoleOffsetX,Y-20,bearingsOffsetZ]),
            cylinder({d1:5,d2:7,h:1.1}).translate([bearingHoleOffsetX,Y-20,bearingsOffsetZ+9.9]),
            cylinder({d1:7,d2:5,h:1.1}).translate([bearingHoleOffsetX,Y-20,19]),
            // endstop mount
            linear_extrude(
                { height: 5 },
                hull(
                    circle({r: 5, center: true}).translate([X-3,3,0]),
                    circle({r: 5, center: true}).translate([X-21,3,0])
                    //circle({r: 5, center: true}).translate([46,10,0]),
                    //circle({r: 5, center: true}).translate([62,10,0])
                )
            )
        ),
        // long bearing hole
        cylinder({d:3.2,h:40}).translate([bearingHoleOffsetX,Y-20,0]),
        cylinder({d:6.5,h:3,fn:6}).translate([bearingHoleOffsetX,Y-20,0]),
        // chamfreins Y
        roundBoolean2(3,40,"tl").rotateX(-90).translate([X-3,0,40]),
        roundBoolean2(3,30,"tl").rotateX(-90).translate([X-3,Y-25,40]),
        // wood screw holes
    	cylinder({d:3.2,h:10}).rotateX(-90).rotateZ(90).translate([10,Y-12,25]),
	    cylinder({d:3.2,h:10}).rotateX(-90).rotateZ(90).translate([10,Y-30,25]),
	    cylinder({d:3.2,h:10}).rotateX(-90).translate([13,Y-10,25]),
	    cylinder({d:3.2,h:10}).rotateX(-90).translate([28,Y-10,25]),
	    cylinder({d:3.2,h:10}).rotateX(-90).translate([13,Y-10,10]),
	    cylinder({d:3.2,h:10}).rotateX(-90).translate([28,Y-10,10]),
	    cylinder({d:6.5,h:3,fn:6}).rotateX(-90).rotateZ(90).translate([7,Y-12,25]),
	    cylinder({d:6.5,h:3,fn:6}).rotateX(-90).rotateZ(90).translate([7,Y-30,25]),
	    cylinder({d:6.5,h:3,fn:6}).rotateX(-90).translate([13,Y-7,25]),
	    cylinder({d:6.5,h:3,fn:6}).rotateX(-90).translate([28,Y-7,25]),
	    cylinder({d:6.5,h:3,fn:6}).rotateX(-90).translate([13,Y-7,10]),
	    cylinder({d:6.5,h:3,fn:6}).rotateX(-90).translate([28,Y-7,10]),
	    // end stop holes
        cylinder({d:3.2,h:40}).translate([X-3,3,0]),
        cylinder({d:3.2,h:40}).translate([X-21,3,0])
    );

    mesh = union(
        mesh.setColor([0,0.7,0])/*,
        GT2idler(20).translate([bearingHoleOffsetX,Y-20,bearingsOffsetZ+1]).setColor([0.7,0.7,0.7]),
        GT2idler(20).translate([bearingHoleOffsetX,Y-20,20.1]).setColor([0.7,0.7,0.7])*/
    );

    return mesh;
}

function Gt2HolderSuspendedRight(boolOffset,height){
    var h = 16;
    var beltThickness = 0.9;
    var beltHeight = 6.1;
    if(height){h=height;}
    return difference(
        linear_extrude({height:10},polygon({points:[[0,0],[9,0],[9,-h],[0,-h/2]]})).translate([-9,h,0]).rotateY(-90).rotateX(90),
        cube([10,1,beltHeight]).translate([-10,boolOffset,h-beltHeight]),
        cube([1,1,beltHeight]).translate([-9,boolOffset+beltThickness,h-beltHeight]),
        cube([1,1,beltHeight]).translate([-7,boolOffset+beltThickness,h-beltHeight]),
        cube([1,1,beltHeight]).translate([-5,boolOffset+beltThickness,h-beltHeight]),
        cube([1,1,beltHeight]).translate([-3,boolOffset+beltThickness,h-beltHeight]),
        cube([1,1,beltHeight]).translate([-1,boolOffset+beltThickness,h-beltHeight])
    ).translate([10,0,0]);
}

function Gt2HolderSuspendedLeft(boolOffset,height,rightHeight){
    var h = 16;
    var rh = 8;
    var beltThickness = 0.9;
    var beltHeight = 6.1;
    if(height){h=height;rh=rightHeight}
    return difference(
        linear_extrude({height:10},polygon({points:[[0,0],[-9,0],[-9,-h],[0,-rh]]})).translate([9,h,0]).rotateY(-90).rotateX(90),
        cube([10,1,beltHeight]).translate([-10,-boolOffset-1,h-beltHeight]),
        cube([1,1,beltHeight]).translate([-9,-boolOffset-1+beltThickness,h-beltHeight]),
        cube([1,1,beltHeight]).translate([-7,-boolOffset-1+beltThickness,h-beltHeight]),
        cube([1,1,beltHeight]).translate([-5,-boolOffset-1+beltThickness,h-beltHeight]),
        cube([1,1,beltHeight]).translate([-3,-boolOffset-1+beltThickness,h-beltHeight]),
        cube([1,1,beltHeight]).translate([-1,-boolOffset-1+beltThickness,h-beltHeight])/*
        union(
            cube([10,1,h-3]).translate([h-10,boolOffset,3]),
            cube([1,1,h-3]).translate([h-9,boolOffset+beltThickness,3]),
            cube([1,1,h-3]).translate([h-7,boolOffset+beltThickness,3]),
            cube([1,1,h-3]).translate([h-5,boolOffset+beltThickness,3]),
            cube([1,1,h-3]).translate([h-3,boolOffset+beltThickness,3]),
            cube([1,1,h-3]).translate([h-1,boolOffset+beltThickness,3])

        )*/
    ).translate([10,0,0]);
}

function head()
{
    var mesh;
    var X = 29.6;//_XYlmLength + 8;
    var Y = 25;//_XYlmDiam + 8;
    var Z = 54.6;//_XYlmDiam + 40;
    var xrodOffset = 40;
    var washer = (X-_XYlmLength) / 2; 
    var headAttachHolesXwidth = 15;
    var top_rod_Z = 35 + 2 + 21;
    var bottom_rod_Z = -2 + 21;

    Z = top_rod_Z + 1;

    mesh = difference(
        
        union(
            cube({size:[X,Y,Z]}),
            //gt2 holders 
            Gt2HolderSuspendedLeft(3.6,9,6.3).translate([0,0,26]),
            Gt2HolderSuspendedRight(3.6).translate([0,Y,32]),
            // support for endstop X
            //cube({size:[5,3.5,5]}).translate([0,-3.5,0]),
            Gt2HolderSuspendedLeft(3.6).translate([X-10,0,32]),
            Gt2HolderSuspendedRight(3.6).translate([X-10,Y,19]) 

        ),
        //rod x holes
        //bottom
        union(
            cylinder({d:_XYlmDiam,h:X,fn:_globalResolution}).rotateY(90).translate([0,Y/2,bottom_rod_Z]),
            //cube({size:[X,5,5]}).rotateX(45).translate([0,Y/2,15.5]),
            cube({size:[X,1,bottom_rod_Z]}).translate([0,Y/2-0.5,0]),
            cube({size:[X,1,_XYlmDiam]}).translate([0,Y/2-0.5,bottom_rod_Z])
            ),

        // top
        LMholes(X).rotateZ(90).translate([X/2,Y/2,top_rod_Z]),
        //LMnutTraps().rotateZ(90).rotateX(-90).translate([X/2,Y/2,top_rod_Z]),
        LMscrewHoles(2.5,2.7,4).rotateZ(90).rotateX(-90).translate([X/2,Y/2,top_rod_Z+1]),
        //LMnutTraps().rotateZ(90).translate([X/2,Y/2,top_rod_Z]),
        /*union(
            cylinder({r:_XYlmDiam/2-1,h:washer,fn:_globalResolution}).rotateY(90).translate([0,Y/2,5.5+_XYlmDiam/2+xrodOffset-1]),
            cube({size:[washer,_XYlmDiam-2,10]}).translate([0,Y/2-_XYlmDiam/2+1,5.5+_XYlmDiam/2+xrodOffset-1]),
            cylinder({r:_XYlmDiam/2,h:_XYlmLength,fn:_globalResolution}).rotateY(90).translate([washer,Y/2,5.5+_XYlmDiam/2+xrodOffset-1]),
            cube({size:[_XYlmLength,_XYlmDiam,10]}).translate([washer,Y/2-_XYlmDiam/2,5.5+_XYlmDiam/2+xrodOffset-1]),
            cylinder({r:_XYlmDiam/2-1,h:washer,fn:_globalResolution}).rotateY(90).translate([washer+_XYlmLength,Y/2,5.5+_XYlmDiam/2+xrodOffset-1]),
            cube({size:[washer,_XYlmDiam-2,10]}).translate([washer+_XYlmLength,Y/2-_XYlmDiam/2+1,5.5+_XYlmDiam/2+xrodOffset-1])
            ),*/
        // head attach holes 
         cylinder({d:3.1,h:Y,fn:_globalResolution}).rotateX(-90).translate([X/2-headAttachHolesXwidth/2,0,2.75]),
         cylinder({d:3.1,h:Y,fn:_globalResolution}).rotateX(-90).translate([X/2+headAttachHolesXwidth/2,0,2.75]),
         cylinder({d:2.7,h:4.5,fn:_globalResolution}).rotateX(-90).translate([X/2-headAttachHolesXwidth/2,0,11.25]),
         cylinder({d:2.7,h:4.5,fn:_globalResolution}).rotateX(-90).translate([X/2+headAttachHolesXwidth/2,0,11.25]),
         cylinder({d:2.7,h:15,fn:_globalResolution}).rotateX(-90).translate([X/2,0,3.4]),
         cylinder({d:2.7,h:4.5,fn:_globalResolution}).rotateX(90).translate([X/2-headAttachHolesXwidth/2,Y,11.25]),
         cylinder({d:2.7,h:4.5,fn:_globalResolution}).rotateX(90).translate([X/2+headAttachHolesXwidth/2,Y,11.25]),
         cylinder({d:2.7,h:15,fn:_globalResolution}).rotateX(90).translate([X/2,Y,3.4])
         
        // screw to fix endstop X under 
         //cylinder({d:2.9,h:10,fn:_globalResolution}).translate([2.5,-1,0])
    );
    return mesh;

}

function nutHolder()
{
    return difference(
            cylinder({d:25,h:12}),
            cylinder({d:10.5,h:12}),
            cylinder({d:3.1,h:12}).translate([-8,0,0]),
            cylinder({d:3.1,h:12}).translate([8,0,0]),
            cylinder({d:7,h:2,fn:6}).rotateZ(30).translate([-8,0,0]),
            cylinder({d:7,h:2,fn:6}).rotateZ(30).translate([8,0,0])
        );
}

function slideZ()
{
    var width = _ZrodsWidth-5;
    var height = 50;
    var depth = 10.5;
    var insideWidth = 35;
    var lmXuu_support_r = _rodsSupportThickness + _ZlmDiam / 2;
    var side_plate_size = 7;
    var side_form_size = lmXuu_support_r + side_plate_size;
    // lmXuu set screws offset
    var set_screw_offset = lmXuu_support_r + side_plate_size / 2 - 1;
    var nutRadius = 14.5/2;
    
        return difference(
            //main form
            union(
                difference(
                    cube({size:[width,depth,height],center:[true,true,false]}),
                    cylinder({r:height-10,h:50,fn:_globalResolution}).rotateX(90).scale([0.9,1,1]).translate([0,30,0])
                ),
                cylinder({d:25,h:12}).translate([0,0,height-12]),

                // lmXuu support
                cylinder({r:lmXuu_support_r,h:height}).translate([-_ZrodsWidth/2,0,0]),
                cylinder({r:lmXuu_support_r,h:height}).translate([_ZrodsWidth/2,0,0]),

                // side forms for lmXuu attach
                cube({size:[side_form_size,10,height]}).translate([-_ZrodsWidth/2-side_form_size,-4,0]),
                cube({size:[side_form_size,10,height]}).translate([_ZrodsWidth/2,-4,0]),

                // extra forms front bearings holes
                cube([16,180,height]).translate([-_ZrodsWidth/2-8,-175,0]),
                cube([16,180,height]).translate([_ZrodsWidth/2-8,-175,0])
                //cube([_ZrodsWidth,95,5]).translate([-_ZrodsWidth/2,-95,height-5])
            ),
            // leadscrew holes
            cylinder({d:10.5,h:height}),
            cylinder({d:3.1,h:12}).translate([-8,0,height-12]),
            cylinder({d:3.1,h:12}).translate([8,0,height-12]),
            cylinder({d:7,h:2,fn:6}).rotateZ(30).translate([-8,0,height-12]),
            cylinder({d:7,h:2,fn:6}).rotateZ(30).translate([8,0,height-12]),
            // big hole middle
            //cylinder({r:8,h:50,fn:_globalResolution}).rotateX(90).translate([width/2+12,40,height/2+10]),
            //cylinder({r:5,h:50,fn:_globalResolution}).rotateX(90).translate([width/2+15,40,height/2-10]),
            //cylinder({r:5,h:50,fn:_globalResolution}).rotateX(90).translate([width/2-10,40,height/2-10]),
            //cylinder({r:height-10,h:50,fn:_globalResolution}).rotateX(90).scale([0.9,1,1]).translate([0,30,0]),
            //cylinder({d:_ZrodsWidth-20,h:50,fn:_globalResolution}).scale([1,2,1]).translate([0,-_ZrodsWidth,0]),
            //  boolean front horizontal
            cylinder({r:95,h:width+40,fn:_globalResolution}).rotateY(90).scale([1,2,1]).translate([-_ZrodsWidth/2-20,-180,-54]),
            //cylinder({r:5,h:width+40,fn:_globalResolution}).rotateY(90).translate([-20,-15,height-10]),
            // front form 
            cube([12,160,height]).translate([_ZrodsWidth/2-10,-175,-5]),
            cube([12,160,height]).translate([-_ZrodsWidth/2-2,-175,-5]),
            // z rod left linear bearing lm
            cylinder({r:_ZlmDiam/2,h:height}).translate([-_ZrodsWidth/2,0,0]),
            //z rod right linear bearing lm
            cylinder({r:_ZlmDiam/2,h:height}).translate([_ZrodsWidth/2,0,0]),
            // side holes for lmXuu attach
            cube({size:[side_form_size+1,2,height]}).translate([-_ZrodsWidth/2-side_form_size-1,0,0]),
            cube({size:[side_form_size+1,2,height]}).translate([_ZrodsWidth/2,0,0]),
            // side holes for lmXuu screws
            cylinder({r:1.4,h:30,fn:_globalResolution}).rotateX(90).translate([_ZrodsWidth/2+set_screw_offset,20,height-10]),
            cylinder({r:1.4,h:30,fn:_globalResolution}).rotateX(90).translate([_ZrodsWidth/2+set_screw_offset,20,10]),
            cylinder({r:1.4,h:30,fn:_globalResolution}).rotateX(90).translate([-_ZrodsWidth/2-set_screw_offset,20,height-10]),
            cylinder({r:1.4,h:30,fn:_globalResolution}).rotateX(90).translate([-_ZrodsWidth/2-set_screw_offset,20,10]),
            // top holes
            cylinder({r:2,h:30,fn:_globalResolution}).translate([-_ZrodsWidth/2+3,-25,height-30]),
            cylinder({r:2,h:30,fn:_globalResolution}).translate([_ZrodsWidth/2-3,-25,height-30]),
            cylinder({r:2,h:30,fn:_globalResolution}).translate([-_ZrodsWidth/2+3,-82.5,height-30]),
            cylinder({r:2,h:30,fn:_globalResolution}).translate([_ZrodsWidth/2-3,-82.5,height-30]),
            cylinder({r:2,h:30,fn:_globalResolution}).translate([-_ZrodsWidth/2+3,-162.5,height-30]),
            cylinder({r:2,h:30,fn:_globalResolution}).translate([_ZrodsWidth/2-3,-162.5,height-30]),
            // top holes nut traps
            cylinder({d:7,h:2,fn:6}).translate([-_ZrodsWidth/2+3,-25,height-5]),
            cylinder({d:7,h:2,fn:6}).translate([_ZrodsWidth/2-3,-25,height-5]),
            cylinder({d:7,h:2,fn:6}).translate([-_ZrodsWidth/2+3,-82.5,height-5]),
            cylinder({d:7,h:2,fn:6}).translate([_ZrodsWidth/2-3,-82.5,height-5]),
            cylinder({d:7,h:2,fn:6}).translate([-_ZrodsWidth/2+3,-162.5,height-5]),
            cylinder({d:7,h:2,fn:6}).translate([_ZrodsWidth/2-3,-162.5,height-5])
            // special hole in gt2 holder to be able to get the belt out .. but still printable vertically.
                //linear_extrude({height:20},polygon({points:[[0,0],[6,0],[4,10],[2,10]]})).rotateY(-90).translate([width/2+5,-10,height-15])
            );
}

function Ztop()
{
    var width = _ZrodsWidth+10;
    var height = 10;
    var depth = 42.5;
    var insideWidth = 35;
    var lmXuu_support_r = _rodsSupportThickness + _ZrodsDiam / 2;
    var side_plate_size = 7;
    var side_form_size = lmXuu_support_r + side_plate_size;
    // lmXuu set screws offset
    var set_screw_offset = lmXuu_support_r + side_plate_size / 2 - 1;
    var nutRadius = 14.5/2;
    
        return difference(
            //main form
            union(
                cube({size:[width,21.25+5,height],center:[true,false,false]}).translate([0,-21.25,0]),
                cylinder({d:27,h:height}),

                // lmXuu support
                cylinder({r:lmXuu_support_r,h:height}).translate([-_ZrodsWidth/2,0,0]),
                cylinder({r:lmXuu_support_r,h:height}).translate([_ZrodsWidth/2,0,0]),

                // side forms for lmXuu attach
                cube({size:[side_form_size,10,height]}).translate([-_ZrodsWidth/2-side_form_size,-4,0]),
                cube({size:[side_form_size,10,height]}).translate([_ZrodsWidth/2,-4,0])
            ),
            // leadscrew holes
            cylinder({d:10.5,h:height}),
            // 608zz hole
            cylinder({d:22.2,h:7.1}).translate([0,0,height-7.1]),
            // z rods
            cylinder({r:_ZrodsDiam/2,h:height}).translate([-_ZrodsWidth/2,0,0]),
            cylinder({r:_ZrodsDiam/2,h:height}).translate([_ZrodsWidth/2,0,0]),
            // side holes for lmXuu attach
            cube({size:[side_form_size+1,2,height]}).translate([-_ZrodsWidth/2-side_form_size-1,0,0]),
            cube({size:[side_form_size+1,2,height]}).translate([_ZrodsWidth/2,0,0]),
            // side holes for lmXuu screws
            cylinder({r:1.4,h:30,fn:_globalResolution}).rotateX(90).translate([_ZrodsWidth/2+set_screw_offset,20,height/2]),
            cylinder({r:1.4,h:30,fn:_globalResolution}).rotateX(90).translate([-_ZrodsWidth/2-set_screw_offset,20,height/2]),
            // back screws
            cylinder({r:1.4,h:50,fn:_globalResolution}).rotateX(90).translate([-32,20,height/2]),
            cylinder({r:1.4,h:50,fn:_globalResolution}).rotateX(90).translate([32,20,height/2]),
            cylinder({d:7,h:15,fn:6}).rotateX(90).translate([-32,0,height/2]),
            cylinder({d:7,h:15,fn:6}).rotateX(90).translate([32,0,height/2]),
            // bools
            cylinder({d:35.7,h:height}).translate([-30,6,0]),
            cylinder({d:35.7,h:height}).translate([30,6,0])
            );
}

function nema17mount(){
    var thickness = 5;
    return difference(
	cube({size:[_nemaXYZ,_nemaXYZ,thickness]}),
	nemaHole(_nemaXYZ).translate([_nemaXYZ/2,_nemaXYZ/2,0])
	);
}

function Zbottom()
{
    var width = _ZrodsWidth+10;
    var height = 5;
    var depth = 42.5;
    var insideWidth = 35;
    var lmXuu_support_r = _rodsSupportThickness + _ZrodsDiam / 2;
    var side_plate_size = 7;
    var side_form_size = lmXuu_support_r + side_plate_size;
    // lmXuu set screws offset
    var set_screw_offset = lmXuu_support_r + side_plate_size / 2 - 1;
    var nutRadius = 14.5/2;
    
        return difference(
            //main form
            union(
                cube({size:[width,8,height],center:[true,false,false]}).translate([0,-21.25,0]),
                cube({size:[10,18,height],center:[true,false,false]}).translate([width/2-5,-21.25,0]),
                cube({size:[10,18,height],center:[true,false,false]}).translate([-width/2+5,-21.25,0]),
                cube({size:[10,8,30],center:[true,false,false]}).translate([39.5,-21.25,0]),
                cube({size:[10,8,30],center:[true,false,false]}).translate([-39.5,-21.25,0]),
                cube({size:[_nemaXYZ,_nemaXYZ,5],center:[true,false,false]}).translate([0,-21.25,0]),
//                cube({size:[48.5,45.5,height],center:[true,false,false]}).translate([0,-21.25,0]),

                // lmXuu support
                cylinder({r:lmXuu_support_r,h:height}).translate([-_ZrodsWidth/2,0,0]),
                cylinder({r:lmXuu_support_r,h:height}).translate([_ZrodsWidth/2,0,0]),

                // side forms for lmXuu attach
                cube({size:[side_form_size,10,height]}).translate([-_ZrodsWidth/2-side_form_size,-4,0]),
                cube({size:[side_form_size,10,height]}).translate([_ZrodsWidth/2,-4,0])
            ),
            // motor mount
            nemaHole(_nemaXYZ).translate([0,21.25-(_nemaXYZ/2),0]),
            // z rods
            cylinder({r:_ZrodsDiam/2,h:height}).translate([-_ZrodsWidth/2,0,0]),
            cylinder({r:_ZrodsDiam/2,h:height}).translate([_ZrodsWidth/2,0,0]),
            // side holes for lmXuu attach
            cube({size:[side_form_size+1,2,height]}).translate([-_ZrodsWidth/2-side_form_size-1,0,0]),
            cube({size:[side_form_size+1,2,height]}).translate([_ZrodsWidth/2,0,0]),
            // side holes for lmXuu screws
            cylinder({r:1.4,h:30,fn:_globalResolution}).rotateX(90).translate([_ZrodsWidth/2+set_screw_offset,20,height/2]),
            cylinder({r:1.4,h:30,fn:_globalResolution}).rotateX(90).translate([-_ZrodsWidth/2-set_screw_offset,20,height/2]),
            // back screws
            cylinder({r:1.4,h:50,fn:_globalResolution}).rotateX(90).translate([-39.5,20,height/2+23]),
            cylinder({r:1.4,h:50,fn:_globalResolution}).rotateX(90).translate([39.5,20,height/2+23]),
            cylinder({d:7,h:15,fn:6}).rotateX(90).translate([-39.5,0,height/2+23]),
            cylinder({d:7,h:15,fn:6}).rotateX(90).translate([39.5,0,height/2+23])
            // bools
            //cube({size:[42.5,42.5,height],center:[true,false,false]}).translate([0,-21.25,0])
            //cylinder({d:35.7,h:height}).translate([-30,6,0]),
            //cylinder({d:35.7,h:height}).translate([30,6,0]),
            //cube({size:[55,50,height],center:[true,false,false]}).translate([0,-21.5,0])
            );
}

function GT2idler(tt=16)
{
    var dd = tt * 1.7 / Math.PI;
    var od = tt == 16 ? 13 : 18;
    return difference(
        union(
            cylinder({d:dd,h:6.6}).translate([0,0,1.1]),
            cylinder({d:od,h:1.1}).translate([0,0,7.7]),
            cylinder({d:od,h:1.1})
        ),
        cylinder({d:3,h:8.8})
    );
}

function GT2toothed(tt=16)
{
    var dd = tt * 1.7 / Math.PI;
    var gt2 = GT2idler(tt);
    for (var t = 0; t < tt; t++)
        gt2 = union(gt2, cylinder({d:1,h:6.5}).translate([-dd/2,0,1.05]).rotateZ(360/tt*t));
    for (t = 0; t < tt; t++)
        gt2 = difference(gt2, cylinder({d:0.7,h:6.5}).translate([-dd/2,0,1.05]).rotateZ(360/tt*(t + 0.5)));
    return gt2;
}

function LMholes(hh)
{
    return union(
        cylinder({d:_XYlmDiam-3,h:(hh-_XYlmLength)/2}).rotateX(90).translate([0,hh/2,0]),
        cylinder({d:_XYlmDiam,h:(_XYlmLength-17.3)/2}).rotateX(90).translate([0,_XYlmLength/2,0]),
        cylinder({d:_XYlmDiam-1,h:1}).rotateX(90).translate([0,17.3/2,0]),
        cylinder({d:_XYlmDiam,h:15.3}).rotateX(90).translate([0,15.3/2,0]),
        cylinder({d:_XYlmDiam-1,h:1}).rotateX(-90).translate([0,-17.3/2,0]),
        cylinder({d:_XYlmDiam,h:(_XYlmLength-17.3)/2}).rotateX(-90).translate([0,-_XYlmLength/2,0]),
        cylinder({d:_XYlmDiam-3,h:(hh-_XYlmLength)/2}).rotateX(-90).translate([0,-hh/2,0])
    );
}

function LMnutTraps()
{
    return union(
        cube([3,6,50]).translate([3,-(_XYlmDiam/2)-3,(_XYlmDiam/2)]),
        cube([3,6,50]).translate([3,(_XYlmDiam/2)-3,(_XYlmDiam/2)]),
        cube([3,6,50]).translate([3,-(_XYlmDiam/2)-3,(_XYlmDiam/2)]).rotateX(180),
        cube([3,6,50]).translate([3,(_XYlmDiam/2)-3,(_XYlmDiam/2)]).rotateX(180)
    );
}

function LMscrewHoles(d=5,hd=3.2,o=0,height=9)
{
    return union(
        cylinder({d:hd,h:height}).rotateY(90).translate([0,-(_XYlmDiam/2)-o,(_XYlmDiam/2)+d]),
        cylinder({d:hd,h:height}).rotateY(90).translate([0,(_XYlmDiam/2)+o,(_XYlmDiam/2)+d]),
        cylinder({d:hd,h:height}).rotateY(90).translate([0,-(_XYlmDiam/2)-o,(_XYlmDiam/2)+d]).rotateX(180),
        cylinder({d:hd,h:height}).rotateY(90).translate([0,(_XYlmDiam/2)+o,(_XYlmDiam/2)+d]).rotateX(180)
    );
}

function LMcap(Y=_XYlmLength+6,Z=_XYlmDiam+18,d=5,hd=3.2)
{
    return difference(
        union(
            //cube({size:[(_XYlmDiam/2)+3,Z,_XYlmDiam+3],center:[false,true,true]}).translate([-(_XYlmDiam/2)-3,0,0]),
            cylinder({d:_XYlmDiam+3,h:Y}).rotateX(90).translate([0,Y/2,Z/2]),
            cube({size:[3,Y,Z],center:[false,true,false]}).translate([-4,0,0])
        ),
        LMholes(Y).translate([0,0,Z/2]),
        LMscrewHoles(d,hd).rotateY(180).translate([0,0,Z/2]),
        cube({size:[_XYlmDiam,Y,100],center:[false,true,false]}).translate([-1,0,0])
    );
}

function XYjoiner()
{
    var belt_thickness = 2;
    var coupling_inner_diameter = 12 - 1 /* tooth size */;
    var carriage_belt_distance = 34;
    var distance_x_lmuu_shaft = 21 - 16.5;
    
    /*return difference(
        union(
            cube([30,carriage_belt_distance,3]).translate([-10,-carriage_belt_distance/2,30]),
            cylinder({d1:5,d2:7,h:1.1}).translate([belt_thickness + coupling_inner_diameter,carriage_belt_distance/2-4.3,28.9]),
            GT2idler().translate([belt_thickness + coupling_inner_diameter,carriage_belt_distance/2-4.3,20.1]),
            cylinder({d1:7,d2:5,h:1.1}).translate([belt_thickness + coupling_inner_diameter,carriage_belt_distance/2-4.3,19]),
            cube([30,carriage_belt_distance,3]).translate([-10,-carriage_belt_distance/2,16]),
            cylinder({d1:5,d2:7,h:1.1}).translate([0,-carriage_belt_distance/2+4.3,14.9]),
            GT2toothed().translate([0,-carriage_belt_distance/2+4.3,6.1]),
            cylinder({d1:7,d2:5,h:1.1}).translate([0,-carriage_belt_distance/2+4.3,5]),
            cube([30,carriage_belt_distance,5]).translate([-10,-carriage_belt_distance/2,0]),
            
            // Illustration
            //GT2toothed(20).translate([0,-40,9.6+5]),
            
            // Rod holders
            cylinder({d:13,h:30}).rotateY(90).translate([-25,0,-10]),
            cylinder({d:13,h:30}).rotateY(90).translate([-25,0,10+8.6+5+8.6]),
            cube([15,13,20+8.6+5+8.6]).translate([-25,-6.5,-10]),
            cube([15,carriage_belt_distance,8+8.6+5+8.6]).translate([-25,-carriage_belt_distance/2,-4])
        ),
        cylinder({d:3.2,h:50}).translate([belt_thickness + coupling_inner_diameter,carriage_belt_distance/2-4.3,0]),
        cylinder({d:3.2,h:50}).translate([0,-carriage_belt_distance/2+4.3,0]),
        
        // Rods
        cylinder({d:8.2,h:30}).rotateY(90).translate([-25,0,-10]),
        cylinder({d:8.2,h:30}).rotateY(90).translate([-25,0,10+8.6+5+8.6]),
        
        // LM8UU hole
        cylinder({d:15.2,h:50}).rotateX(90).translate([-distance_x_lmuu_shaft,25,-10])
    );*/
    
    var pulley_bottom_x = _nemaXYZ/2;
    var pulley_bottom_y = -(carriage_belt_distance - coupling_inner_diameter) / 2;
    var pulley_bottom_z = 6.1;
    var pulley_top_x = _nemaXYZ/2 + belt_thickness + coupling_inner_diameter;
    var pulley_top_y = (carriage_belt_distance - coupling_inner_diameter) / 2;
    var pulley_top_z = 20.1;
    var Y = (pulley_top_y - pulley_bottom_y) + 10;
    var X = (pulley_top_x - pulley_bottom_x) + 20;
    var Z = pulley_top_z + 9.9 + 5;
    var top_rod_Z = Z+2.1;//5.5+_XYlmDiam/2+xrodOffset-1 - 21;
    //var bottom_rod_Z = 5.5+_XYlmDiam/2-21;
    var bottom_rod_Z = -2.1;
    var left = pulley_top_x+10-X;
    var left_side_width = left;//(_XYlmDiam + 6) / 3;
    
    return difference(
            union(
 	cube({size:[X,Y,5]}).translate([left,-Y/2,0]),
 	cube({size:[X,Y,3]}).translate([left,-Y/2,pulley_bottom_z+9.9]),
 	cube({size:[X,Y,5]}).translate([left,-Y/2,pulley_top_z+9.9]),
 	cube({size:[left_side_width+1,Y,pulley_top_z+14.9]}).translate([-1,-Y/2,0]),
 	cube({size:[5,Y,pulley_top_z+14.9]}).translate([pulley_top_x+5,-Y/2,0]),

                // lm8uu
    	//cylinder({d:_XYlmDiam+6,h:Y}).rotateX(90).translate([16.5,Y/2,-6.5]),

    	cylinder({d:_XYlmDiam+6,h:Y}).rotateX(90).translate([0,Y/2,Z/2]),
    	cube([(_XYlmDiam+6)/2,Y,_XYlmDiam+6]).translate([0,-Y/2,(Z-_XYlmDiam-6)/2]),
    	//cube([10,Y,7]).translate([-_XYlmDiam-3,0,0]).rotateY(45).translate([0,-Y/2,Z/2-3.5]),

    	//cylinder({d:_XYlmDiam-1,h:1}).rotateX(90).translate([16.5,Y/2-(16.4/2),-6.5]),
    	//cylinder({d:_XYlmDiam-1,h:1}).rotateX(90).translate([16.5,Y/2+(16.4/2),-6.5]),
    	

                cylinder({d1:7,d2:5,h:1.1}).translate([pulley_bottom_x,pulley_bottom_y,pulley_bottom_z-1.1]),
                //GT2idler().translate([pulley_bottom_x,pulley_bottom_y,pulley_bottom_z]),
                cylinder({d1:5,d2:7,h:1.1}).translate([pulley_bottom_x,pulley_bottom_y,pulley_bottom_z+8.8]),

                cylinder({d1:7,d2:5,h:1.1}).translate([pulley_top_x,pulley_top_y,pulley_top_z-1.1]),
                //GT2idler().translate([pulley_top_x,pulley_top_y,pulley_top_z]),
                cylinder({d1:5,d2:7,h:1.1}).translate([pulley_top_x,pulley_top_y,pulley_top_z+8.8]),
                
                // rod holders
                cylinder({d:_XYrodsDiam+6,h:10}).rotateY(90).translate([left+X-10,0,top_rod_Z]),
                //cube([10,_XYrodsDiam+6,top_rod_Z-Z]).translate([left+X-10,-(_XYrodsDiam+6)/2,Z]),
                cube([10,7,10]).translate([left+X-10,-3.5,top_rod_Z+(_XYrodsDiam/2)]),

                cylinder({d:_XYrodsDiam+6,h:10}).rotateY(90).translate([left+X-10,0,bottom_rod_Z]),
                //cube([10,_XYrodsDiam+6,bottom_rod_Z]).translate([left+X-10,-(_XYrodsDiam+6)/2,0]),
                cube([10,7,10]).translate([left+X-10,-3.5,bottom_rod_Z-(_XYrodsDiam/2)-10])
            ),

            // LM8UU
            //cube([8,Y,15]).translate([20,-Y/2,-20]),
            /*cylinder({d:_XYlmDiam,h:(Y-17.3)/2}).rotateX(90).translate([16.5,Y/2,-6.5]),
            cylinder({d:_XYlmDiam-1,h:1}).rotateX(90).translate([16.5,17.3/2,-6.5]),
            cylinder({d:_XYlmDiam,h:15.3}).rotateX(90).translate([16.5,15.3/2,-6.5]),
            cylinder({d:_XYlmDiam-1,h:1}).rotateX(-90).translate([16.5,-17.3/2,-6.5]),
            cylinder({d:_XYlmDiam,h:(Y-17.3)/2}).rotateX(-90).translate([16.5,-Y/2,-6.5]),*/

            /*cylinder({d:_XYlmDiam,h:(Y-17.3)/2}).rotateX(90).translate([0,Y/2,Z/2]),
            cylinder({d:_XYlmDiam-1,h:1}).rotateX(90).translate([0,17.3/2,Z/2]),
            cylinder({d:_XYlmDiam,h:15.3}).rotateX(90).translate([0,15.3/2,Z/2]),
            cylinder({d:_XYlmDiam-1,h:1}).rotateX(-90).translate([0,-17.3/2,Z/2]),
            cylinder({d:_XYlmDiam,h:(Y-17.3)/2}).rotateX(-90).translate([0,-Y/2,Z/2]),*/
            LMholes(Y).translate([0,0,Z/2]),
            //LMnutTraps().translate([-1,0,Z/2]),
            LMscrewHoles(5,2.7).translate([-1,0,Z/2]),
            
            cube([(_XYlmDiam+6)/2,Y,Z]).translate([-(_XYlmDiam+6)/2-1,-Y/2,0]),

    	//cube([15,Y,2]).translate([-_XYlmDiam-3,0,0]).rotateY(45).translate([0,-Y/2,Z/2]),
 	    //cylinder({d:3.2,h:10}).translate([-12.5,0,-5]).rotateY(45).translate([0,0,Z/2]),
           
            // holes for belt
            cube({size:[5,Y/3,11]}).translate([pulley_top_x+5,-Y/2,pulley_bottom_z-1.1]),
            cube({size:[5,Y/3,11]}).translate([pulley_top_x+5,Y/6,pulley_top_z-1.1]),

            // holes for rods
            cylinder({d:_XYrodsDiam,h:18}).rotateY(90).translate([left+X-18,0,top_rod_Z]),
            cylinder({d:_XYrodsDiam,h:18}).rotateY(90).translate([left+X-18,0,bottom_rod_Z]),
            cube([X+5,2,13]).translate([left-5,-1,top_rod_Z+(_XYrodsDiam/2)-3]),
            cube([X+5,2,13]).translate([left-5,-1,bottom_rod_Z-(_XYrodsDiam/2)-10]),

            // holes for rod screws
            cylinder({d:3.2,h:7}).rotateX(90).translate([left+X-5,3.5,top_rod_Z+(_XYrodsDiam/2)+6]),
            cylinder({d:3.2,h:7}).rotateX(90).translate([left+X-5,3.5,bottom_rod_Z-(_XYrodsDiam/2)-6]),

            // holes for bearing screws
            cylinder({d:3.2,h:Z}).translate([pulley_bottom_x,pulley_bottom_y,-10]),
            cylinder({d:3.2,h:Z}).translate([pulley_top_x,pulley_top_y,10])

            //,
            //cylinder({d:_XYlmDiam-1,h:1}).rotateX(90).translate([16.5,Y/2 - (Y-15.3)/2,-6.5]),
            //cylinder({d:_XYlmDiam,h:15.3}).rotateX(90).translate([16.5,Y/2,-6.5]),
            //cylinder({d:_XYlmDiam-1,h:1}).rotateX(90).translate([16.5,Y/2,-6.5]),
            //cylinder({d:_XYlmDiam,h:(Y-17.3)/2}).rotateX(90).translate([16.5,0,-6.5])
        ).translate([(_XYlmDiam/2)+6,0,0]);
}

function head_attach()
{
    var X = 25;
    return difference(
        union(
            cube([23,10,7]).translate([-11.5,11,0]),
            linear_extrude(
                { height: 7 },
                hull(
                    circle({r: 4, center: true}).translate([-7.5,11.25,0]),
                    circle({r: 4, center: true}).translate([7.5,11.25,0]),
                    circle({r: 4, center: true}).translate([0,3.4,0])
                )
            ),
            linear_extrude(
                { height: 20 },
                hull(
                    circle({r:5.5, center:true}).translate([-9.5,22.2,0]),
                    circle({r:5.5, center:true}).translate([9.5,22.2,0])
                )
            ),
            // fan wings
            cube({size:[8,3,20],round:true}).translate([-25.5,24.7,5]),
            cube({size:[8,3,20],round:true}).translate([17.5,24.7,5]),
            cube({size:[40,3,10]}).translate([-20,24.7,10])
        ),
        
        // head attach holes
        cylinder({d:3.1,h:7}).translate([-7.5,11.25,0]),
        cylinder({d:3.1,h:7}).translate([7.5,11.25,0]),
        cylinder({d:3.1,h:7}).translate([0,3.4,0]),
        cylinder({d:6,h:2}).translate([-7.5,11.25,5]),
        cylinder({d:6,h:2}).translate([7.5,11.25,5]),
        cylinder({d:6,h:2}).translate([0,3.4,5]),
        
        // clamp attach holes
        cylinder({d:3.1,h:20}).translate([-11.75,22.9,0]),
        cylinder({d:3.1,h:20}).translate([11.75,22.9,0]),
        
        // e3d mount
        cylinder({d:16,h:6}).rotateX(90).translate([0,22.7,20]),
        cylinder({d:12,h:5}).rotateX(90).translate([0,27.7,20]),
        
        // fan wings
        cylinder({d:3.1,h:3}).rotateX(90).translate([-21.5,27.7,19.5]),
        cylinder({d:3.1,h:3}).rotateX(90).translate([-21.5,27.7,11]),
        cylinder({d:3.1,h:3}).rotateX(90).translate([21.5,27.7,19.5]),
        cylinder({d:3.1,h:3}).rotateX(90).translate([21.5,27.7,11]),
        
        cube([10,2,4]).translate([-13.5,26,0])
    );
    
    // 8, 43
}


function XYjoiner_v2()
{
    var belt_thickness = 2;
    var coupling_inner_diameter = 12 - 1 /* tooth size */;
    var carriage_belt_distance = 34;
    var pulley_bottom_x = _nemaXYZ/2;
    var pulley_bottom_y = -(carriage_belt_distance - coupling_inner_diameter) / 2;
    var pulley_bottom_z = 6.1;
    var pulley_top_x = _nemaXYZ/2 + belt_thickness + coupling_inner_diameter;
    var pulley_top_y = (carriage_belt_distance - coupling_inner_diameter) / 2;
    var pulley_top_z = 20.1;
    
    var Y = (pulley_top_y - pulley_bottom_y) + 20;
    var X = (pulley_top_x - pulley_bottom_x) + 20;
    var Z = pulley_top_z + 9.9 + 5;
    var top_rod_Z = Z+2.1;//5.5+_XYlmDiam/2+xrodOffset-1 - 21;
    //var bottom_rod_Z = 5.5+_XYlmDiam/2-21;
    var bottom_rod_Z = -2.1;
    var rod_Z = pulley_top_z - 2.6;
    var left = pulley_top_x+10-X;
    var left_side_width = left;//(_XYlmDiam + 6) / 3;
    
    return difference(
        union(
         	cube({size:[X,Y,3]}).translate([left,-Y/2,pulley_bottom_z+9.9]),

            // lm8uu
    	    cylinder({d:_XYlmDiam+6,h:Y}).rotateX(90).translate([left-(_XYlmDiam+6)/2,Y/2,rod_Z+1.5]),
    	    cube([(_XYlmDiam+8),Y,(_XYlmDiam+6)/2+1.5]).translate([left-(_XYlmDiam+7),-Y/2,(Z-_XYlmDiam-6)/2]),

            // universal pulley holes
            cylinder({d1:7,d2:4,h:1.1}).translate([pulley_bottom_x,pulley_bottom_y,pulley_top_z-1.1]),
            cylinder({d1:4,d2:7,h:1.1}).translate([pulley_bottom_x,pulley_bottom_y,pulley_bottom_z+8.8]),
            cylinder({d1:7,d2:4,h:1.1}).translate([pulley_top_x,pulley_bottom_y,pulley_top_z-1.1]),
            cylinder({d1:4,d2:7,h:1.1}).translate([pulley_top_x,pulley_bottom_y,pulley_bottom_z+8.8]),
            cylinder({d1:7,d2:4,h:1.1}).translate([pulley_top_x,pulley_top_y,pulley_top_z-1.1]),
            cylinder({d1:4,d2:7,h:1.1}).translate([pulley_top_x,pulley_top_y,pulley_bottom_z+8.8]),
            cylinder({d1:7,d2:4,h:1.1}).translate([pulley_bottom_x,pulley_top_y,pulley_top_z-1.1]),
            cylinder({d1:4,d2:7,h:1.1}).translate([pulley_bottom_x,pulley_top_y,pulley_bottom_z+8.8]),

            //GT2idler(16).setColor([0.5,0.5,0.5]).translate([pulley_bottom_x,pulley_bottom_y,pulley_bottom_z]),
            //GT2idler(16).setColor([0.5,0.5,0.5]).translate([pulley_top_x,pulley_top_y,pulley_top_z]),
            /*GT2idler(16).setColor([0.5,0.5,0.5]).translate([pulley_bottom_x,pulley_top_y,pulley_bottom_z]),
            GT2idler(16).setColor([0.5,0.5,0.5]).translate([pulley_top_x,pulley_bottom_y,pulley_top_z]),*/

            // rod holders
            cylinder({d:_XYrodsDiam+6,h:10}).rotateY(90).translate([left+X-10,-Y/2-4.5,rod_Z]),
            cube([10,10,7]).translate([left+X-10,-Y/2-14.05-(_XYrodsDiam/2),rod_Z-3.5]),
            cylinder({d:_XYrodsDiam+6,h:10}).rotateY(90).translate([left+X-10,Y/2+4.5,rod_Z]),
            cube([10,10,7]).translate([left+X-10,Y/2+4.05+(_XYrodsDiam/2),rod_Z-3.5]),
            cube([2,20,13]).translate([left+X-2,Y/2+(_XYrodsDiam/2)-5.95,rod_Z-16.5]),
            cube([20,2,13]).translate([left-(_XYlmDiam+7),-Y/2,-6]),
            cube([20,2,25]).translate([left+X-20,Y/2-2,rod_Z-26.5])
        ),

        LMholes(Y).translate([0,0,Z/2]),
        LMscrewHoles(1,3,8.5,40).rotateY(-90).translate([0,0,0]),
    	cube([(_XYlmDiam+6),Y,(_XYlmDiam+6)/2+1.5]).translate([left-(_XYlmDiam+6),-Y/2,rod_Z+1.5]),

        // holes for rods
        cylinder({d:_XYrodsDiam,h:18}).rotateY(90).translate([left+X-18,Y/2+4.5,rod_Z]),
        cylinder({d:_XYrodsDiam,h:18}).rotateY(90).translate([left+X-18,-Y/2-4.5,rod_Z]),
        cube([10,10,1]).translate([left+X-10,-Y/2-14.05-(_XYrodsDiam/2),rod_Z-0.5]),
        cube([10,10,1]).translate([left+X-10,Y/2+4.05+(_XYrodsDiam/2),rod_Z-0.5]),

        // holes for rod screws
        cylinder({d:3.2,h:7}).translate([left+X-5,-Y/2-11-(_XYrodsDiam/2),rod_Z-3.5]),
        cylinder({d:3.2,h:7}).translate([left+X-5,Y/2+11+(_XYrodsDiam/2),rod_Z-3.5]),

        // holes for bearing screws
        cylinder({d:3.2,h:Z}).translate([pulley_bottom_x,pulley_bottom_y,-10]),
        cylinder({d:3.2,h:Z}).translate([pulley_top_x,pulley_top_y,10]),
        cylinder({d:3.2,h:Z}).translate([pulley_top_x,pulley_bottom_y,-10]),
        cylinder({d:3.2,h:Z}).translate([pulley_bottom_x,pulley_top_y,10])
    ).translate([(_XYlmDiam/2)+6,0,0]);
}

function XYjoiner_v2_cap()
{
    var belt_thickness = 2;
    var coupling_inner_diameter = 12 - 1 /* tooth size */;
    var carriage_belt_distance = 34;
    var pulley_bottom_x = _nemaXYZ/2;
    var pulley_bottom_y = -(carriage_belt_distance - coupling_inner_diameter) / 2;
    var pulley_bottom_z = 6.1;
    var pulley_top_x = _nemaXYZ/2 + belt_thickness + coupling_inner_diameter;
    var pulley_top_y = (carriage_belt_distance - coupling_inner_diameter) / 2;
    var pulley_top_z = 20.1;
    
    var Y = (pulley_top_y - pulley_bottom_y) + 20;
    var X = (pulley_top_x - pulley_bottom_x) + 20;
    var Z = pulley_top_z + 9.9 + 5;
    var top_rod_Z = Z+2.1;//5.5+_XYlmDiam/2+xrodOffset-1 - 21;
    //var bottom_rod_Z = 5.5+_XYlmDiam/2-21;
    var bottom_rod_Z = -2.1;
    var rod_Z = pulley_top_z - 2.6;
    var left = pulley_top_x+10-X;
    var left_side_width = left;//(_XYlmDiam + 6) / 3;
    
    return difference(
        union(
            // lm8uu
    	    cylinder({d:_XYlmDiam+6,h:Y}).rotateX(90).translate([left-(_XYlmDiam+6)/2,Y/2,rod_Z+1.5]),
    	    cube([(_XYlmDiam+8),Y,(_XYlmDiam+6)/2+1.5]).translate([left-(_XYlmDiam+7),-Y/2,(Z-_XYlmDiam-6)/2])
        ),

        LMholes(Y).translate([0,0,Z/2]),
        LMscrewHoles(1,3,8.5,40).rotateY(-90).translate([0,0,Z/2-20]),
    	cube([(_XYlmDiam+6)+3,Y,(_XYlmDiam+6)/2+3]).translate([left-(_XYlmDiam+6)-1.5,-Y/2,rod_Z-1.5])
    ).translate([(_XYlmDiam/2)+6,0,0]);
}


function Gt2Holder(){
    var beltThickness = 0.9;
    var beltHeight = 8.8;//6.1;
    var boolOffset = 3.6;
    return difference(
        cube([10,9,beltHeight]),
        //linear_extrude({height:10},polygon({points:[[0,0],[9,0],[9,-h],[0,-h/2]]})).translate([-9,h,0]).rotateY(-90).rotateX(90),
        cube([10,1,beltHeight]).translate([0,boolOffset,0]),
        cube([1,1,beltHeight]).translate([9,boolOffset+beltThickness,0]),
        cube([1,1,beltHeight]).translate([7,boolOffset+beltThickness,0]),
        cube([1,1,beltHeight]).translate([5,boolOffset+beltThickness,0]),
        cube([1,1,beltHeight]).translate([3,boolOffset+beltThickness,0]),
        cube([1,1,beltHeight]).translate([1,boolOffset+beltThickness,0])
    ).translate([0,-boolOffset-1,0]);
}

function Gt2HolderHoles(length=10){
    var beltThickness = 0.9;
    var beltHeight = 8.8;//6.1;
    var boolOffset = 3.6;
    var mesh = cube([length,1,beltHeight]).translate([0,boolOffset,0]);
    for (var i = 1; i < length; i += 2)
        mesh = union(mesh, cube([1,1,beltHeight]).translate([i,boolOffset+beltThickness,0]));
    return mesh.translate([0,-boolOffset-1,0]);
}

function head_v2()
{
    var belt_thickness = 2;
    var coupling_inner_diameter = 12 - 1 /* tooth size */;
    var carriage_belt_distance = 34;
    var pulley_bottom_x = _nemaXYZ/2;
    var pulley_bottom_y = -(carriage_belt_distance - coupling_inner_diameter) / 2;
    var pulley_bottom_z = 6.1;
    var pulley_top_x = _nemaXYZ/2 + belt_thickness + coupling_inner_diameter;
    var pulley_top_y = (carriage_belt_distance - coupling_inner_diameter) / 2;
    var pulley_top_z = 20.1;
    var rod_z = pulley_top_z - 2.6;

    var mesh;
    var X = 29.6 + 10;//_XYlmLength + 8;
    var Y = (pulley_top_y - pulley_bottom_y) + 20;
    //var Y = 25;//_XYlmDiam + 8;
    var Z = 54.6;//_XYlmDiam + 40;
    var xrodOffset = 40;
    var washer = (X-_XYlmLength) / 2; 
    var headAttachHolesXwidth = 15;
    var top_rod_Z = 35 + 2 + 21;
    var bottom_rod_Z = -2 + 21;

    Z = top_rod_Z + 1;

    mesh = difference(
        
        union(
            cube({size:[X,Y+20+_XYlmDiam,5.2+8.8]}).translate([0,-(Y+20+_XYlmDiam)/2,rod_z-2.6-8.8]),
 
            //cylinder({d:_XYlmDiam+6,h:X}).rotateY(90).translate([0,-Y/2-5,rod_z]),
            //cylinder({d:_XYlmDiam+6,h:X}).rotateY(90).translate([0,Y/2+5,rod_z]),

            //gt2 holders 
            //Gt2Holder().translate([0,pulley_top_y-6,pulley_bottom_z]),
            Gt2Holder().translate([0,pulley_top_y-6,pulley_top_z]),
            // support for endstop X
            //cube({size:[5,3.5,5]}).translate([0,-3.5,0]),
            Gt2Holder().translate([X-10,pulley_bottom_y+6,pulley_top_z])
            //Gt2Holder().translate([X-10,pulley_bottom_y+6,pulley_bottom_z]) 

        ),

        cube({size:[X,_XYlmDiam+7,_XYlmDiam]}).translate([0,-Y/2-_XYlmDiam-1,rod_z+2.6]),
        cube({size:[X,_XYlmDiam+7,_XYlmDiam]}).translate([0,Y/2-6,rod_z+2.6]),
        cube([16,40,3]).translate([X-16,-Y/2-17-14,rod_z-2.6-8.8]),

        LMholes(X).rotateZ(90).translate([X/2,-Y/2-4.5,rod_z]),
        LMholes(X).rotateZ(90).translate([X/2,Y/2+4.5,rod_z]),
        //LMnutTraps().rotateY(90).translate([X/2,-Y/2-5,12]),
        //LMnutTraps().rotateY(90).translate([X/2,Y/2+5,12]),
        LMscrewHoles(9.5,3.1,1.9,40).rotateY(90).translate([X/2,-Y/2-4.5,rod_z+2.6]),
        LMscrewHoles(9.5,3.1,1.9,40).rotateY(90).translate([X/2,Y/2+4.5,rod_z+2.6]),
        
        Gt2HolderHoles(X).translate([0,pulley_top_y-6,pulley_bottom_z]),
        //cube([X,3,1]).translate([0,pulley_top_y-8,pulley_bottom_z]),
        cylinder({d:2,h:X}).rotateY(90).translate([0,pulley_top_y-6,pulley_bottom_z]),
        Gt2HolderHoles(X).translate([0,pulley_bottom_y+6,pulley_bottom_z]),
        //cube([X,3,1]).translate([0,pulley_bottom_y+4,pulley_bottom_z]),
        cylinder({d:2,h:X}).rotateY(90).translate([0,pulley_bottom_y+6,pulley_bottom_z]),
        
        // head mount holes
        cylinder({d:5,h:40}).translate([X/2,0,0]),
        cylinder({d:3.1,h:40}).translate([X/2,-12.5,0]),
        cylinder({d:3.1,h:40}).translate([X/2,12.5,0])
        
        //rod x holes
        //bottom
        /*union(
            cylinder({d:_XYlmDiam,h:X,fn:_globalResolution}).rotateY(90).translate([0,Y/2,bottom_rod_Z]),
            //cube({size:[X,5,5]}).rotateX(45).translate([0,Y/2,15.5]),
            cube({size:[X,1,bottom_rod_Z]}).translate([0,Y/2-0.5,0]),
            cube({size:[X,1,_XYlmDiam]}).translate([0,Y/2-0.5,bottom_rod_Z])
            ),

        // top
        LMholes(X).rotateZ(90).translate([X/2,Y/2,top_rod_Z]),
        //LMnutTraps().rotateZ(90).rotateX(-90).translate([X/2,Y/2,top_rod_Z]),
        LMscrewHoles(2.5,2.7,4).rotateZ(90).rotateX(-90).translate([X/2,Y/2,top_rod_Z+1])
        //LMnutTraps().rotateZ(90).translate([X/2,Y/2,top_rod_Z]),

        // screw to fix endstop X under 
         //cylinder({d:2.9,h:10,fn:_globalResolution}).translate([2.5,-1,0])*/
    );
    return mesh;

}

function cable_mount()
{
    return difference(
        union(
            linear_extrude(
                { height: 10 },
                hull(
                    circle({r: 5, center: true}),
                    circle({r: 5, center: true}).translate([52,0,0])
                    //circle({r: 5, center: true}).translate([46,10,0]),
                    //circle({r: 5, center: true}).translate([62,10,0])
                )
            ),
            linear_extrude(
                { height: 10 },
                hull(
                    circle({r: 5, center: true}).translate([42,-12.3,0]),
                    circle({r: 5, center: true}).translate([57,-12.3,0])
                    //circle({r: 5, center: true}).translate([46,10,0]),
                    //circle({r: 5, center: true}).translate([62,10,0])
                )
            ),
            cube([25,12.3,10]).translate([37,-12.3,0])
        ),
        cube([72,5,10]).translate([-5,0,0]),
        cube([3,10,10]).translate([43.5,-10,0]),
        cylinder({d:4.5,h:10}).translate([57,-12.3,0]),
        cylinder({d:8,h:10}).translate([45,-9.3,0]),
        cylinder({d:3.2,h:10}).rotateX(90).translate([7,0,5]),
        cylinder({d:3.2,h:10}).rotateX(90).translate([25,0,5])
    );
        
        // 12,3
}

function main()
{
    //return cable_mount();
    //return rod_holder();
    //return bearingsXY_front().translate([0,40,0]);
    //return motorXY_back().translate([0,-80,0]);
    //return LMcap(29.6,25,2.5,2.7);
    //return LMcap(_XYlmLength+8,_XYlmDiam+20);
    //return head_attach();
    //return head_v2();
    return XYjoiner_v2();
    //return XYjoiner_v2();
    return union(
        XYjoiner_v2().translate([-80,0,0]),
        head_v2());;
    return union(
        motorXY().translate([0,-80,0]),
        XYjoiner(),
        //LMcap(_XYlmLength+8,_XYlmDiam+20).translate([10,0,0]),
        head().translate([70,-12.5,-21]).setColor([0.7,0,0]),
        bearingsXY().translate([0,40,0])
    );
}
