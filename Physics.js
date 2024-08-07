class Physics {
  constructor(length, width, height, mass) {
    this.length = length;
    this.width = width;
    this.height = height;
    this.mass = mass;
    this.gravity = 9.81;
    this.position = new Vector3();
    this.velocity = new Vector3();
    this.accel = new Vector3();
    this.frontFace = this.calculateFrontFace();
    this.airResist = 8;
    this.airDensity = 1.184;
    this.waterResist = 0.5;
    this.waterDensity = 1000;
    this.rpmRange = 0;

    document.addEventListener("keydown", (event) => {
      if (event.key === "W") {
          if (this.rpmRange <= 7000) {
              this.rpmRange += 500;
          }
      }

  });
  }

  // حساب الحجم المغمور بناءً على قوة الطفو
  getSubmergedHeight() {
    const volume = this.length * this.width * this.height;
    const buoyantForce = this.mass * this.gravity;
    const waterDensity = 1000; // كثافة الماء بالكيلوغرام/متر مكعب

    // حجم الجزء المغمور من القارب
    const submergedVolume = buoyantForce / (waterDensity * this.gravity);

    // ارتفاع الجزء المغمور من القارب
    const submergedHeight = submergedVolume / (this.length * this.width);
    console.log('submerged hieght'+submergedHeight)
    return submergedHeight;
  }

  updateParams(length, width, height, mass) {
    this.length = length;
    this.width = width;
    this.height = height;
    this.mass = mass;
  }

  isSinking() {
    const submergedHeight = this.getSubmergedHeight();
    return submergedHeight >= this.height;
  }
   /////////////////22222222/////////////////////////////
   update() {
    ///// Total force
    var totalF = this.totalForce();

    ///// ACCELERATION
    this.acceleration = totalF.divideScalar(this.mass);

    ///// Velocity 
    this.velocity = this.velocity.addVector(
        this.acceleration.clone().multiplyScalar(0.02)
    );

    ///// Position
    this.position = this.position.addVector(
        this.velocity.clone().multiplyScalar(0.02)
    );
}

///////////////////// Total Force ///////////////
totalForce() {
    var tf = new Vector3();
    
    return tf;
}

pushForce() {
    var pushVector = new Vector3();
    
    return pushVector;
}

dragForce() {
    var airF = this.airForce();
    var waterF = this.waterForce();
    var F_drag = - (airF + waterF);
    var dragVector = new Vector3(F_drag, 0, 0);
    return dragVector;
}

calculateFrontFace() {
    var ft = this.width * (this.height - this.getSubmergedHeight());
    return ft;
}

airForce() {
    return 0.5 * (this.frontFace * this.airResist * this.airDensity * this.velocity.length() * this.velocity.length());
}

waterForce() {
    return 0.5 * (this.frontFace * this.waterResist * this.waterDensity * this.velocity.length() * this.velocity.length());
}

  
}


export default Physics;
