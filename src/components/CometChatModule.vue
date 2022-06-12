<template>
  <q-page style="height: 100%" id="callScreen">
    <q-dialog v-model="tokenDialog" persistent>
      <q-card style="width: 500px">
        <q-card-section class="row items-center">
          <q-avatar icon="key" />
          <span class="text-h6 q-ml-sm">{{
            t('videoCall.cometChat.userToken')
          }}</span>
        </q-card-section>
        <q-card-section>
          <q-form ref="tokenForm">
            <q-input
              :disable="loading"
              clearable
              :hint="t('videoCall.cometChat.pleaseContactMe')"
              outlined
              v-model="userToken"
              lazy-rules
              :loading="loading"
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  t('videoCall.cometChat.enterSomething'),
              ]"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            :label="t('videoCall.cometChat.goHome')"
            color="grey"
            @click="router.push('/')"
          />
          <q-space />
          <q-btn
            flat
            :label="t('videoCall.cometChat.enter')"
            color="primary"
            @click="submit()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-footer
      flat
      :class="$q.dark.isActive ? 'bg-black text-light' : 'bg-white text-black'"
      v-show="joinedCall"
    >
      <div :class="`q-pa-md row justify-center`">
        <q-btn-dropdown
          split
          rounded
          :icon="cameraStatus ? 'videocam' : 'videocam_off'"
          class="q-mx-sm"
          @click="cameraStatus = !cameraStatus"
        >
          <q-list v-for="i in camerasList" :key="i.id">
            <q-item clickable v-close-popup @click="changeCamera(i)">
              <q-item-section avatar v-if="i.active">
                <q-icon color="positive" name="done" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ i.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn-dropdown
          split
          rounded
          :icon="microphoneStatus ? 'mic' : 'mic_off'"
          class="q-mx-sm"
          @click="microphoneStatus = !microphoneStatus"
        >
          <q-list v-for="i in microphonesList" :key="i.id">
            <q-item clickable v-close-popup @click="changeMicrophone(i)">
              <q-item-section avatar v-if="i.active">
                <q-icon color="positive" name="done" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ i.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn
          @click="$q.dark.toggle()"
          :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
          rounded
          class="q-mx-sm"
        >
        </q-btn>
        <q-btn flat icon="call_end" color="red" @click="router.push('/')" />
      </div>
    </q-footer>
  </q-page>
</template>

<script lang="ts">
import { CometChat } from '@cometchat-pro/chat';
import { defineComponent, ref, onBeforeUnmount, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'CometChat',
  setup() {
    const router = useRouter();
    const { t } = useI18n({ useScope: 'global' });
    const loading = ref(false);
    const joinedCall = ref(false);
    const tokenForm = ref(null);
    const tokenDialog = ref(true);
    const userToken = ref('');
    const microphoneStatus = ref(true);
    const cameraStatus = ref(true);
    const microphonesList = ref([]);
    const camerasList = ref([]);
    let callController = CometChat.CallController.getInstance();

    watch(microphoneStatus, (newValue) => {
      callController.muteAudio(!newValue);
    });

    watch(cameraStatus, (newValue) => {
      callController.pauseVideo(!newValue);
    });

    function login() {
      loading.value = true;

      let appID = import.meta.env.VITE_COMETCHAT_APP_ID,
        region = import.meta.env.VITE_COMETCHAT_APP_REGION,
        appSetting = new CometChat.AppSettingsBuilder()
          .subscribePresenceForAllUsers()
          .setRegion(region)
          .autoEstablishSocketConnection(true)
          .build();
      CometChat.init(appID, appSetting).then(
        (initialized) => {
          console.log('Initialization completed successfully', initialized);
          var authToken = userToken.value;
          CometChat.getLoggedinUser().then(
            (user) => {
              if (!user) {
                CometChat.login(authToken).then(
                  (user: CometChat.User) => {
                    console.log('Login Successful:', { user });
                    startCall();
                  },
                  (error: CometChat.CometChatException) => {
                    console.log('Login failed with exception:', { error });
                    loading.value = false;
                  }
                );
              } else {
                console.log('Already logged in', user);
                startCall();
              }
            },
            (error: CometChat.CometChatException) => {
              console.log('Some Error Occured', { error });
              loading.value = false;
            }
          );
        },
        (error: CometChat.CometChatException) => {
          console.log('Initialization failed with error:', error);
          loading.value = false;
        }
      );
    }

    function startCall() {
      let sessionID = 'INTERVIEW';

      const uiDiv = document.getElementById('callScreen');

      if (uiDiv) {
        let css = `.custom-main-container{
	background-color:transparent;
}`;
        let callSettings = new CometChat.CallSettingsBuilder()
          .enableDefaultLayout(false)
          .setSessionID(sessionID)
          .setIsAudioOnlyCall(false)
          .showModeButton(false)
          .setMode('GRID')
          .forceLegacyUI(true)
          .setCustomCSS(css)
          .build();

        CometChat.startCall(
          callSettings,
          uiDiv,
          new CometChat.OngoingCallListener({
            onUserJoined: (user: CometChat.User) => {
              console.log('user joined:', user);
            },
            onUserLeft: (user: CometChat.User) => {
              console.log('user left:', user);
            },
            onUserListUpdated: (userList: CometChat.User[]) => {
              microphonesList.value = callController.getAudioInputDevices();
              camerasList.value = callController.getVideoInputDevices();
              if (!joinedCall.value) {
                loading.value = false;
                joinedCall.value = true;
                tokenDialog.value = false;
              }
              console.log('user list:', userList);
            },
            onCallEnded: (call: CometChat.Call) => {
              console.log('Call ended:', call);
            },
            onError: (error: CometChat.CometChatException) => {
              console.log('Error :', error);
            },
            onMediaDeviceListUpdated: (deviceList) => {
              console.log('Device List:', deviceList);
              microphonesList.value = deviceList.audioInputDevices;
              camerasList.value = deviceList.videoInputDevices;
            },
            onUserMuted: (
              userMuted: CometChat.User,
              userMutedBy: CometChat.User
            ) => {
              // This event will work in JS SDK v3.0.2-beta1 & later.
              console.log('Listener => onUserMuted:', userMuted, userMutedBy);
            },
            onScreenShareStarted: () => {
              // This event will work in JS SDK v3.0.3 & later.
              console.log('Screen sharing started.');
            },
            onScreenShareStopped: () => {
              // This event will work in JS SDK v3.0.3 & later.
              console.log('Screen sharing stopped.');
            },
          })
        );
      }
    }

    function submit() {
      tokenForm.value.validate().then((success) => {
        if (success) {
          login();
        } else {
          // oh no, user has filled in
        }
      });
    }

    function changeCamera(device) {
      callController.setVideoInputDevice(device.id);
    }

    function changeMicrophone(device) {
      callController.setAudioInputDevice(device.id);
    }

    onBeforeUnmount(() => {
      CometChat.logout().then(
        () => {
          console.log('Logout completed successfully');
        },
        (error: CometChat.CometChatException) => {
          console.log('Logout failed with exception:', { error });
        }
      );
    });
    return {
      userToken,
      tokenDialog,
      t,
      tokenForm,
      login,
      submit,
      loading,
      microphonesList,
      camerasList,
      changeCamera,
      changeMicrophone,
      cameraStatus,
      microphoneStatus,
      router,
      joinedCall,
    };
  },
});
</script>

<style scoped>
:deep() iframe {
  border: none !important;
}
</style>
