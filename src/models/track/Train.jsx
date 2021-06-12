import { useLayoutEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, PositionalAudio } from '@react-three/drei'
import { useBox } from '@react-three/cannon'
import { useSnapshot } from 'valtio'
import { gameState } from '../../store'

export function Train({ args = [38, 8, 10], position = [-145.84, 3.42, 54.67], rotation = [0, -0.09, 0] }) {
  const group = useRef()
  const { ready, sound } = useSnapshot(gameState)
  const { animations, nodes: n, materials: m } = useGLTF('/models/track-draco.glb')
  const [, api] = useBox(() => ({ mass: 10000, type: 'Kinematic', args, position, rotation }), undefined, [args, position, rotation])
  const { actions } = useAnimations(animations, group)
  const config = { receiveShadow: true, castShadow: true, 'material-roughness': 1 }

  useLayoutEffect(() => void actions.train.play(), [actions])
  useFrame(() => {
    api.position.set(group.current.position.x, group.current.position.y, group.current.position.z)
    api.rotation.set(group.current.rotation.x, group.current.rotation.y - 0.09, group.current.rotation.z)
  })

  return (
    <group ref={group} name="train" position={[-145.84, 3.42, 54.67]} rotation={[0, -0.09, 0]} dispose={null}>
      <mesh geometry={n.train_1.geometry} material={m.custom7Clone} {...config} />
      <mesh geometry={n.train_2.geometry} material={m.blueSteelClone} {...config} />
      <mesh geometry={n.train_3.geometry} material={m.custom12Clone} {...config} />
      <mesh geometry={n.train_4.geometry} material={m.custom14Clone} {...config} />
      <mesh geometry={n.train_5.geometry} material={m.defaultMatClone} {...config} />
      <mesh geometry={n.train_6.geometry} material={m.glassClone} {...config} />
      <mesh geometry={n.train_7.geometry} material={m.steelClone} {...config} />
      <mesh geometry={n.train_8.geometry} material={m.lightRedClone} {...config} />
      <mesh geometry={n.train_9.geometry} material={m.darkClone} {...config} />
      {sound && ready && <PositionalAudio url="/sounds/train.mp3" loop autoplay distance={5} />}
    </group>
  )
}