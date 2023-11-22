import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Toast, ToastDescription, VStack} from '@gluestack-ui/themed';

export default function CustomToast({id, text}) {
  return (
    <Toast nativeID={'toast-' + id} action="attention" variant="solid">
      <VStack space="xs">
        <ToastDescription>{text}</ToastDescription>
      </VStack>
    </Toast>
  );
}

const styles = StyleSheet.create({});
