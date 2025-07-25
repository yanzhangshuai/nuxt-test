<script lang="ts">
</script>

<script setup lang="ts">
import type { Rule } from 'ant-design-vue/es/form'
import type { FormInstance } from 'ant-design-vue'

import { reactive, ref } from 'vue'
import { computedAsync } from '@vueuse/core'

import { useUserStore } from '~/stores/user'
import { useAccountService } from '~/services/account'

interface IForm {
  name?   : string
  email   : string
  password: string
}

const props = defineProps<{
  type: 1 | 2 // 1: Login, 2: Register
}>()

const open = defineModel<boolean>('open', { required: true })

const userStore = useUserStore()
const accountService = useAccountService()

const currentType = ref<1 | 2>(1)

const formRef = ref<FormInstance>()
const loading = ref(false)

// 登录表单
const form = reactive<IForm>({
  name    : '',
  email   : '',
  password: '',
})

const fieldTouched = reactive<{
  [key in keyof IForm]?: boolean
}>({})

const loginRules: Record<keyof IForm, Rule[]> = {
  name : [], // Optional for login
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' as const },
    { type: 'email' as const, message: '请输入有效的邮箱地址', trigger: ['blur', 'change'] as const },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' as const },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' as const },
  ],
}

const registerRules: Record<keyof IForm, Rule[]> = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: ['blur', 'change'] },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, message: '密码长度不能少于8位', trigger: 'blur' },
  ],
}

const disabled = computedAsync(async () => {
  if (!unref(formRef))
    return false

  // Only validate fields that have been touched
  const validate = Object.entries(fieldTouched)
    .filter(([_, touched]) => touched)
    .map(([field]) => field)

  if (validate.length === 0)
    return false

  try {
    await unref(formRef)!.validate(validate)
    return validate.length === (currentType.value === 1 ? 2 : 3)
  }
  catch {
    return false
  }
})

watch(() => props.type, (newType) => {
  currentType.value = newType || 1
}, { immediate: true })

watch([currentType, open], () => {
  formRef.value?.resetFields()
  Object.entries(fieldTouched).forEach(([key]) => {
    fieldTouched[key as keyof IForm] = false
  })
}, { immediate: true })

async function onSubmit() {
  try {
    loading.value = true

    if (unref(currentType) === 1) {
      // await userStore.login(form.email, form.password)
      const { error } = await accountService.login({
        email   : form.email,
        password: form.password,
      })

      if (unref(error))
        throw unref(error)!.data
    }
    else {
      const { error } = await accountService.register({
        name    : form.name!,
        email   : form.email,
        password: form.password,
      })

      if (unref(error))
        throw unref(error)!.data
      // await useUserStore().fetchUser()
    }
    await useUserSession().fetch()

    open.value = false // 登录成功关闭弹窗
  }
  catch (error: any) {
    message.error(error.message)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <AModal
    v-model:open="open"
    :title="currentType === 1 ? '用户登录' : '用户注册'"
    :footer="null"
    :mask-closable="false"
    width="400px"
    class="auth-modal"
  >
    <AForm
      ref="formRef"
      :model="form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
      :rules="currentType === 1 ? loginRules : registerRules"
      @finish="onSubmit"
    >
      <AFormItem v-if="currentType === 2" label="姓名" name="name">
        <AInput
          v-model:value="form.name"
          placeholder="请输入您的姓名"
          prefix-icon="user"
          @change="fieldTouched.name = true"
        />
      </AFormItem>

      <AFormItem
        label="邮箱"
        name="email"
      >
        <AInput
          v-model:value="form.email"
          placeholder="请输入您的邮箱"
          :prefix-icon="1 ? 'user' : 'mail'"
          @change="fieldTouched.email = true"
        />
      </AFormItem>

      <AFormItem
        label="密码"
        name="password"
      >
        <AInputPassword
          v-model:value="form.password"
          :placeholder="1 ? '请输入密码' : '请输入至少8位密码'"
          prefix-icon="lock"
          @change="fieldTouched.password = true"
        />
      </AFormItem>

      <AFormItem :wrapper-col="{ offset: 6, span: 16 }">
        <AButton
          type="primary"
          html-type="submit"
          :loading="loading"
          :disabled="!disabled"
          block
          class="submit-btn"
        >
          {{ currentType === 1 ? '登录' : '注册' }}
        </AButton>
      </AFormItem>

      <div class="switch-text">
        <template v-if="currentType === 1">
          没有账号？<a @click="currentType = 2">立即注册</a>
        </template>
        <template v-else>
          已有账号？<a @click="currentType = 1">立即登录</a>
        </template>
      </div>
    </AForm>
  </AModal>
</template>

<style scoped>
.auth-modal :deep(.ant-modal-content) {
  border-radius: 12px;
  overflow: hidden;
}

.auth-modal :deep(.ant-form-item) {
  margin-bottom: 20px;
}

.auth-modal :deep(.ant-input-affix-wrapper),
.auth-modal :deep(.ant-input) {
  padding: 10px 12px;
  border-radius: 8px;
}

.submit-btn {
  height: 40px;
  font-size: 16px;
  border-radius: 8px;
  margin-top: 8px;
}

.switch-text {
  text-align: center;
  margin-top: 16px;
  color: #666;
}

.switch-text a {
  color: #1890ff;
  cursor: pointer;
  margin-left: 4px;
}
</style>
