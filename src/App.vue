<script setup lang="ts">
import { ref } from 'vue';
import type { Position } from './models/rover';
import { RoverHelper } from './helpers/rover-helper';

const GRID_SIDE_LENGTH = 500;
const roverRef = ref<HTMLElement | null>(null);
const currentPosition = ref<Position>({ x: 0, y: 0, orientation: 'N' });
const upperRightCoordinates = ref<string>('');
const landingPosition = ref<string>('');
const instructions = ref<string>('');
const yMovement = ref<number>(0);
const xMovement = ref<number>(0);
const lastPosition = ref<Position>({ x: 0, y: 0, orientation: 'N' });


async function dispatchMovementSequence(positions: Position[]) {
  for (const position of positions) {
    await move(position);
  }
}

async function move(position: Position) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (roverRef.value) {
        currentPosition.value = position;
        movementEffect(position);
      }
      resolve(position);
    }, 1000);
  });
}

function movementEffect(position: Position) {
  if (roverRef.value) {
    roverRef.value.style.top = `${GRID_SIDE_LENGTH - (position.y * yMovement.value)}px`;
    roverRef.value.style.left = `${position.x * xMovement.value}px`;
    roverRef.value.style.transition = 'all 1s ease-in-out';
  }
}


function execute() {
  const roverHelper = new RoverHelper();
  const roverResponse = roverHelper.execute(upperRightCoordinates.value, landingPosition.value, instructions.value);
  yMovement.value = GRID_SIDE_LENGTH / roverResponse.upperRightCoordinates.y;
  xMovement.value = GRID_SIDE_LENGTH / roverResponse.upperRightCoordinates.x;
  lastPosition.value = roverResponse.lastPosition;
  dispatchMovementSequence(roverResponse.positionHistory);
}

</script>

<template>
  <main>
    <div class="grid">
      <span id="rover" ref="roverRef">
        <span class="position">{{ currentPosition.x }}, {{ currentPosition.y }}, {{ currentPosition.orientation }} </span>
      </span>
    </div>
    <div style="margin-top: 100px;">
      <div>
        <label>Upper Right Coordinates: </label>
        <input type="text" v-model="upperRightCoordinates" placeholder="5,5" /><br>
        <label>Landing Position:</label>
        <input type="text" v-model="landingPosition" placeholder="1 2 N"/><br>
        <label>Instructions:</label>
        <input type="text" v-model="instructions" placeholder="LMLMLMLMM" /><br>
        <button @click="execute">Execute</button><br>
        <label>Last Position: <strong>{{ lastPosition}}</strong></label>
      </div>
    </div>
  </main>
</template>

<style scoped>
.grid {
  height: 500px;
  width: 500px;
  background-color: #ccc;
  position: relative;
}

#rover {
  position: absolute;
  top: 100%;
  left: 0;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #000;
}

.position {
  position: absolute;
  top: 100%;
  left: 50%;
  width: 60px;
  height: 30px;
  border-radius: 5px;
  background-color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>./services/rover-helper