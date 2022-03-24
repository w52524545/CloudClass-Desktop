export const en = {
  'Close Microphone': 'close microphone',
  'Open Microphone': 'open microphone',
  'Camera Not Available': 'Camera Not Available',
  'Microphone Not Available': 'Microphone Not Available',
  'Close Camera': 'close camera',
  'Open Camera': 'open camera',
  'Clear Podium': 'Close Podium',
  'Clear Podiums': 'Clear Podiums',
  'Close Whiteboard': 'close whiteboard',
  'Open Whiteboard': 'open whiteboard',
  Star: 'star',
  'Open Private Call': 'open private call',
  'Close Private Call': 'close private call',
  role: {
    teacher: 'Teacher',
    student: 'Student',
    assistant: 'Assistant',
  },
  disabled: 'Disabled',
  whiteboard: {
    'upload-success': 'Upload Success',
    'upload-error': 'Upload Error',
    converting: 'Converting',
    'disconnect-img-alt': 'Whiteboard Disconnected',
    'disconnect-btn': 'Connect Again',
    'courseWare-loading': 'Courseware Loading...',
    'h5-courseWare': 'HTML5 Courseware',
    'test-courseWare': 'Test Courseware',
  },
  screen_share: 'Screen Share',
  kick: {
    kick_out_student: 'Kick Out',
  },
  radio: {
    kicked_once: 'Teacher has removed you from class.',
    ban: 'Banned',
  },
  course: {
    pre_class: 'Pre Class',
    in_class: 'In Class',
    end_class: 'End Class',
    join_failed: 'Join Failure',
    screen_sharing: 'Screen Sharing',
  },
  device: {
    camera: 'Camera',
    speaker: 'Speaker',
    microphone: 'Microphone',
    microphone_volume: 'Microphone Volume',
    speaker_volume: 'Speaker Volume',
  },
  student: {
    student_name: 'Name',
    camera: 'Camera',
    microphone: 'Microphone',
    operation: 'Remove',
  },
  roster: {
    chat: 'Mute Chat',
    teacher_name: 'Teacher:',
    user_list: 'Roster',
    student_name: 'Name',
    student_co_video: 'On Stage',
    close_student_co_video: 'You are not on stage and cannot interact with others',
    open_student_co_video:
      'The teacher has invited you to stage. You may interact with others now.',
    board_state: 'Board',
    camera_state: 'Camera',
    microphone_state: 'Microphone',
    reward: 'Reward',
    kick: 'Kick',
    granted: 'Auth',
    shift: 'Video Rotation',
    everyone: 'Everyone',
    available: 'Available',
    students_in: 'students in',
    sequence: 'sequence',
    random: 'random',
    order_every: 'order every',
    seconds: 'seconds',
    no_more_data: 'No more data',
  },
  hands_up: 'Hands Up',
  on_podium_max_count:
    'The number of people on stage has reached the upper limit, and students cannot be invited to stage',
  hands_up_tip: 'Press and hold down',
  co_video: {
    remote_open_camera: 'Your camera has been turned on',
    remote_open_microphone: 'Your mic has been turned on',
    remote_grant_board: 'You can now use the whiteboard tools',
    remote_close_camera: 'Your camera has been turned off',
    remote_close_microphone: 'Your mic has been turned off',
    remote_revoke_board: 'You cannot use the whiteboard tools',
    received_student_hands_up: 'A student wants to get on the stage',
    received_teacher_accepted: 'Teacher Accepted',
    received_teacher_refused: 'Teacher Refused',
    received_student_cancel: 'Teacher Cancelled',
    received_message_timeout: 'No Response. Try again?',
    hands_up_requsted: 'Your request has been sent',
    hands_up_cancelled: 'Your request has been cancelled',
  },
  private_media_chat: {
    chat_started: 'Private media chat started',
    chat_ended: 'Private media chat ended',
  },
  signal: {
    delay: 'Delay',
    lose: 'Packet Loss',
    status: 'Status',
    CPU: 'CPU',
    receive: 'Receive',
    send: 'Send',
  },
  placeholder: {
    muted_chat: 'Muted Chat',
    empty_chat: 'Empty Message',
    empty_quiz: 'Empty Question',
    enable_chat_muted: 'Student Chat Muted',
    input_message: 'Please Input Message',
  },
  error: {
    banned: 'Prohibited',
    cannot_join: 'You are prohibited from entering classroom.',
    conflict: 'Hands Up Conflict',
    not_found: 'Page Not Found',
    apply_co_video_limit: 'Onstage student limit is reached.',
    send_co_video_limit: 'Roll call co-video over maximum',
    components: {
      paramsEmpty: 'params：{reason} can`t be empty',
    },
    class_end: 'The class has ended.',
    unknown: 'Unknown error occured. Code: {errCode} Details: {message}',
    room_is_full: 'The room is full',
    network_timeout: 'Network request timeout',
  },
  toast: {
    mute_chat: 'You were silenced by {hostName}',
    unmute_chat: 'You were allowed to chat by {hostName}',
    remote_mute_chat: '{studentName} was silenced by {hostName}',
    remote_unmute_chat: '{studentName} was allowed to chat by {hostName}',
    add_screen_share: 'Teacher starts to the screen share',
    remove_screen_share: 'Teacher stops the screen share',
    granted_board_success: 'Grant Permission success',
    revoke_board_success: 'Revoke Permission success',
    create_screen_share_failed: 'Create screen share failed',
    kick_by_other_side: 'Kick out by other client',
    screen_share: 'Screen Share',
    close_ppt: 'Close CourseWare',
    sure_close_ppt: 'Are you sure to close?',
    end_class: 'End Class',
    quit_from_room: 'Leave Class Room',
    kick_by_teacher: 'You have been kicked out of the classroom',
    upload_log_failure: 'Upload Log Failure，ErrorName:{reason}，see more details in devtool.',
    show_log_id: `Report your log ID: {reason}`,
    api_login_failured: 'Join Failured, Reason: {reason}',
    confirm: 'Confirm',
    cancel: 'Cancel',
    leave_room: 'Leave Classroom',
    quit_room: 'You want to exit the classroom?',
    kick: 'Account remote login',
    login_failure: 'login failure',
    whiteboard_lock: 'Whiteboard follow',
    whiteboard_unlock: 'Whiteboard nofollow',
    canceled_screen_share: 'Canceled screen sharing',
    screen_sharing_failed: 'Screen sharing failed, reason: {reason}',
    recording_failed: 'Start cloud recording failed, reason: {reason}',
    start_recording: {
      title: 'Start Recording',
      body: 'Are you sure to start recording the classroom?',
      success: 'Recording successfully started',
    },
    stop_recording: {
      title: 'Recording stopped',
      body: 'Stop recording the classroom?',
      success: 'Recording successfully stopped.',
    },
    recording_too_short: 'Recording must be at least 15 seconds',
    rtm_login_failed: 'login failure, please check your network',
    rtm_login_failed_reason: 'login failure, reason: {reason}',
    replay_failed: 'Replay failed please refresh browser',
    teacher_exists: 'Teacher existed. Please wait 30s or reopen a new class.',
    student_over_limit:
      'Number of Students exceeds maximum. Please waiting 30s or join a new class',
    teacher_and_student_over_limit:
      'The number of students and teacher have reached the upper limit',
    teacher_accept_whiteboard: 'Teacher already granted your whiteboard',
    teacher_cancel_whiteboard: 'Teacher already cancel your whiteboard',
    teacher_accept_co_video: 'Teacher already accept co-video',
    teacher_reject_co_video: 'Teacher already rejected co-video',
    teacher_cancel_co_video: 'Teacher already cancelled co-video',
    student_cancel_co_video: 'Student cancelled co-video',
    student_peer_leave: '"{reason}" Left',
    student_send_co_video_apply: '"{reason}" send the co-video request',
    stop_co_video: 'Stop "{reason}" co-video',
    reject_co_video: 'Reject co-video',
    close_co_video: 'Close co-video',
    close_youself_co_video: 'Stop co-video',
    accept_co_video: 'Accept co-video',
    successfully_joined_the_room: 'Successfully joined the room',
    failed_to_join_the_room: 'Failed to join the room',
    failed_to_authorize_whiteboard: 'Failed to authorize whiteboard',
    failed_to_deauthorize_whiteboard: 'Failed to deauthorize whiteboard',
    failed_to_query_playback_list: 'Failed to query playback list',
    audio_equipment_has_changed: 'Audio equipment has changed',
    video_equipment_has_changed: 'Video equipment has changed',
    failed_to_initiate_screen_sharing: 'Failed to initiate screen sharing',
    failed_to_end_screen_sharing: 'Failed to end screen sharing',
    failed_to_initiate_screen_sharing_to_remote: 'Failed to initiate screen sharing to remote',
    failed_to_enable_screen_sharing: 'Failed to enable screen sharing',
    failed_to_enable_screen_sharing_permission_denied:
      'Open screen capture failed. Please grant permission for screen capture.',
    failed_to_send_chat: 'Failed to send chat',
    failed_to_translate_chat: 'Failed to translate chat',
    failed_to_send_reward: 'Failed to send reward',
    failed_to_join_rtc_please_refresh_and_try_again:
      'Failed to join RTC, please refresh and try again',
    leave_rtc_channel: 'Leave RTC channel',
    failed_to_leave_rtc: 'Failed to leave RTC',
    co_video_close_success: 'On Stage dismissed success',
    co_video_close_failed: 'On Stage dismissed failure',
    publish_rtc_success: 'Publish RTC Success',
    open_whiteboard_follow: 'open whiteboard follow',
    close_whiteboard_follow: 'close whiteboard follow',
    i: 'I',
    teacher: 'Teacher',
    the_teacher_authorized_your_whiteboard: 'The teacher invites you to the whiteboard',
    the_teacher_cancelled_your_whiteboard_permission:
      'The teacher cancelled your whiteboard permission',
    publish_business_flow_successfully: 'Publish business flow successfully',
    media_method_call_failed: 'Media method call failed',
    successfully_left_the_business_channel: 'Successfully left the business channel',
    course_started_successfully: 'Course start successfully',
    setting_start_failed: 'Setting start failed',
    the_course_ends_successfully: 'Course end successfully',
    setting_ended_failed: 'Setting ended failed',
    start_recording_successfully: 'Start recording successfully',
    start_recording_failed: 'Start recording failed',
    successfully_ended_recording: 'Successfully_ended_recording',
    failed_to_end_recording: 'Failed to end recording',
    you_have_a_default_message: 'You have a default message',
    the_teacher_agreed: 'Teacher Agreed',
    student_applied: 'Student applied',
    you_were_dismissed_by_the_teacher: 'You were dismissed by the teacher',
    student_canceled: 'Student cancelled',
    the_teacher_refused: 'Teacher refused',
    failed_to_initiate_a_raise_of_hand_application:
      'Failed to initiate a raise of hand application',
    failed_to_end_the_call: 'Failed to end the call',
    failed_to_join_board: 'Failed to join board',
    stop_screen_share_failed: 'Stop screen share failed',
    classroom_remote_join: 'Account was logged in from remote device, you have left the classroom',
    time_interval_between_start: `The class will start in {reason} minutes`,
    time_interval_between_end: `The class will be over in {reason} minutes`,
    class_is_end: `Class is over. The classroom will be closed in {reason} minutes`,
    time_interval_between_close: `The classroom will be closed in {reason} minutes`,
    reward_limit: 'The maximum number of trophies in this class has been reached',
    chat_enable: 'Enable Mute Chat',
    chat_disable: 'Disable Mute Chat',
    upload_failure: 'Upload Failure',
    download_success: 'Download Success',
    download_failure: 'Download Failure',
    resource_already_opened: 'This resource is already opened',
    resource_is_converting: 'The resource is converting',
    fail_to_convert_resource: 'The resource conversion failed',
    interaction_too_frequent: 'The operation is too frequent, please try again later.',
  },
  end_class_confirm: 'Confirm the end of class?',
  notice: {
    student_interactive_apply: `"{reason}" want to co-video`,
  },
  scaffold: {
    clear: 'Clear',
    undo: 'Undo',
    redo: 'Redo',
    search: 'Search',
    student_list: 'Student List',
    pencil: 'Pencil',
    laser_pointer: 'Laser pointer',
    countdown: 'countdown',
    straight: 'straight',
    circle: 'circle',
    rectangle: 'rectangle',
    arrow: 'arrow',
    pentagram: 'pentagram',
    rhombus: 'rhombus',
    triangle: 'triangle',
    selector: 'popupQuiz',
    clicker: 'mouse',
    eraser: 'eraser',
    color: 'color',
    blank_page: 'add page',
    move: 'move',
    follow: 'Follow',
    un_follow: 'Unfollow',
    screen_share: 'Screen Share',
    stop_screen_share: 'Stop Screen Share',
    cloud_storage: 'Cloud Storage',
    text: 'Text',
    tools: 'Tools',
    user_list: 'User List',
  },
  message: 'Message',
  quiz: 'Question',
  en: 'English',
  cloud: {
    fileName: 'file name',
    size: 'size',
    progress: 'progress',
    updated_at: 'updated at',
    operation: 'operation',
    publicResources: 'Public Resources',
    deleteTip: 'Delete the selected file?',
    personalResources: 'Personal Resources',
    downloadResources: 'Download Resources',
    upload: 'Upload',
    delete: 'Delete',
    download: 'Download',
    downloading: 'Download',
    pause: 'Pause',
    upload_success: 'Upload Success',
    supprotTypeTitle: 'format of file are support',
    fileType: 'Type',
    ppt: 'PPT',
    word: 'Word',
    excel: 'Excel',
    pdf: 'Pdf',
    video: 'Video',
    audio: 'Audio',
    txt: 'Txt',
    photo: 'Photo',
    fileCounts: 'total of {fileCounts}',
  },
  media: {
    camera: 'Camera',
    switch_camera: 'Switch Camera',
    microphone: 'Microphone',
    switch_microphone: 'Switch Microphone',
    microphone_volume: 'Microphone Volume',
    speaker: 'Speaker',
    switch_speaker: 'Switch Speaker',
    volume: 'Volume',
    adjust_volume: 'Adjust Volume',
    test_speaker: 'Test Speaker',
    camera_error: 'Device exception, camera is unplugged or occupied and cannot be used.',
    microphone_error: 'Device exception, microphone is unplugged or occupied and cannot be used.',
    mirror: 'mirror',
    beauty: 'beauty',
    whitening: 'Whitening',
    buffing: 'Buffing',
    ruddy: 'Ruddy',
    default: 'Default',
  },
  tool: {
    board_name: 'Whiteboard',
    screen_share: 'Screen Share',
    selector: 'mouse selector',
    pencil: 'pencil',
    rectangle: 'rectangle',
    ellipse: 'ellipse',
    eraser: 'eraser',
    text: 'text',
    color_picker: 'color picker',
    add: 'add new page',
    upload: 'upload ',
    hand_tool: 'hand selector',
    extension_tool: 'extension tool',
    clear: 'clear',
    disk: 'disk',
    prev: 'back',
    next: 'forward',
    zoomIn: 'zoom in',
    zoomOut: 'zoom out',
    fullScreen: 'full screen',
    reduction: 'reduction',
    reset: 'center',
  },
  pretest: {
    title: 'Device Test',
    settingTitle: 'Device Setting',
    finishTest: 'Finish',
    detect_new_device: 'The device is now installed, Please try it!',
    camera_move_out: 'Camera is pulled out, unable to display video!',
    mic_move_out: 'Microphone is pulled out!',
    device_move_out: 'Device is pulled out!',
    playback_move_out: 'Speaker is pulled out!',
    device_not_working: 'The device is not working properly!',
    detect_new_device_in_room:
      'The device has installed, Please click setting and select the new device.',
    teacher_device_may_not_work: "There is something wrong with the teacher's device",
  },
  'biz-header': {
    perf: 'Perf',
    setting: 'Setting',
    exit: 'Exit',
    recording: 'Recording',
    start_record: 'Start Recording',
    stop_record: 'Stop Recording',
  },
  nav: {
    delay: 'Delay: ',
    network: 'Network: ',
    cpu: 'CPU: ',
    class_end: 'Class end',
    class_start: 'Class start',
    back: 'Back',
    to_start_in: 'To start in: ',
    started_elapse: 'Started: ',
    ended_elapse: 'Ended: ',
    class_not_started: 'Class has not started',
    hours: 'hours',
    minutes: 'minutes',
    seconds: 'seconds',
    ms: 'ms',
    short: {
      hours: 'hrs',
      minutes: 'mins',
      seconds: 'secs',
    },
    signal_excellent: 'Excellent',
    signal_good: 'Good',
    signal_weak: 'Weak',
    signal_bad: 'Bad',
    signal_unknown: 'Unknown',
    signal_down: 'down',
    singal_poor_tip: 'Poor local network connection, please check the network connection.',
    singal_down_tip: 'The local network is disconnected, please check the network connection.',
  },
  send: 'Send',
  home: {
    form_title: 'Free Use',
    roomId: 'RoomId',
    roomId_placeholder: 'Please input roomId',
    userId: 'UserId',
    userId_placeholder: 'Please input userId',
    roomName: 'Room',
    roomName_placeholder: 'Please input room name',
    nickName: 'Name',
    nickName_placeholder: 'Please input your name',
    roomType: 'Type',
    roomType_placeholder: 'Please select class type',
    roomType_1v1: 'One to One Classroom',
    roomType_interactiveSmallClass: 'Interactive Small Classroom',
    roomType_interactiveBigClass: 'Lecture Hall',
    role: 'Role',
    role_placeholder: 'Please select your role',
    encryptionMode: 'Mode',
    encryptionMode_placeholder: 'Please select your mode',
    encryptionKey: 'Key',
    encryptionKey_placeholder: 'Please input your key',
    role_teacher: 'Teacher',
    role_student: 'Student',
    role_assistant: 'Assistant',
    role_audience: 'Audience',
    role_observer: 'Observer',
    language: 'Language:',
    language_placeholder: 'Please choose language',
    duration: 'Duration',
    duration_unit: 'mins',
    enter_classroom: 'Enter',
    region_placeholder: 'Please choose region',
    region: 'Region:',
    'header-left-title': 'Agora Flexible Classroom',
    about: 'About',
    'input-error-msg': 'Between 6 and 50 characters,letter or number only',
    'input-username-error-msg': 'Between 3 and 25 characters,letter or number only',
    network_error: 'Network error, please try again later',
    'recordation-search': 'Recordation',
    'recordation-tip': 'Recordations only within 1 hour',
    replay: 'replay',
    search: 'search',
    system_name: 'Agora Flexible Classroom',
  },
  'home-about': {
    'privacy-policy': 'Privacy Policy',
    'product-disclaimer': 'Product Disclaimer',
    'sign-up': 'Sign up Agora.io',
    'version-time': 'Version Time',
    'sdk-version': 'SDK Version',
    'classroom-version': 'Flexible Classroom Version',
    check: 'View',
    register: 'Sign up',
  },
  disclaimer: {
    title: 'Product Disclaimer',
    'content-a': `Agora Live ("this product") is a product provided by Agora. Agora enjoys the copyright and ownership of this product. It is hereby granted free of charge to anyone who obtains a copy of this product and related documentation (hereinafter referred to as "software") to try the software without limitation, including but not limited to trial, copy, modify, merge, publish, distribute, but this product shall not be used For any commercial use, you may not sublicense and / or sell copies of the software.`,
    'content-b': `This product is provided "as is" without any express warranty, including but not limited to guarantees of suitability, suitability for specific purposes, and non-infringement. Whether it is due to any contract, infringement or other forms of conduct related to this product or the trial of this product or other methods, Agora will not be responsible for any claims, damages or other liabilities.`,
    'content-c': `You are free to choose whether to try the services provided by this product. If you download, install, or try the services provided in this product, it means that you trust the owner of the product, and Agora shall not be responsible for any form of loss or injury caused by yourself or others when you try the services provided in this product for any reason.`,
  },
  countdown: {
    appName: 'Countdown',
    seconds: 'seconds',
    start: 'Start',
    restart: 'Restart',
  },
  confirm: {
    delete: 'Delete prompt',
  },
  stream: {
    'placeholder.loading': 'Camera is loading',
    'placeholder.muted': 'Camera is closed',
    'placeholder.broken': 'Camera is broken',
    'placeholder.notpresent.teacher': 'Teacher is not in the classroom',
    'placeholder.notpresent.student': 'Student is not in the classroom',
  },
  screenshare: {
    display: 'Display {reason}',
  },
  toast2: {
    'teacher.turn.off.my.mic': 'Your mic is turned off by teacher',
    'teacher.turn.on.my.mic': 'Your mic is turned on by teacher',
    'teacher.turn.off.my.cam': 'Your camera is turned off by teacher',
    'teacher.turn.on.my.cam': 'Your camera is turned on by teacher',
    'teacher.grant.permission': 'You can now draw on the whiteboard',
    'teacher.revoke.permission': 'You can no longer draw on the whiteboard',
    'teacher.accept.onpodium':
      'The teacher has invited you on-stage，you can interact with others now',
    'teacher.revoke.onpodium': 'You are not on stage and cannot interact with others',
    'teacher.reward': 'Congratulations to {reason} for getting a star',
    'teacher.reward2':
      'Congratulations to {reason1} and {reason2} other students for getting a star',
    screen_permission_denied:
      'Before using screen sharing, please turn on the screenshot permission',
  },
  cabinet: {
    answer: {
      appName: 'Pop-up quiz',
    },
    countdown: {
      appName: 'Countdown',
    },
    vote: {
      appName: 'Polling',
    },
  },
  answer: {
    appName: 'Pop-up quiz',
    start: 'Begin Answering',
    submit: 'Post',
    change: 'Change My Answer',
    'number-answered': 'Submission List',
    acc: 'Accuracy',
    'right-key': 'The Correct Answer',
    'my-answer': 'My Answer',
    over: 'End Of Answer',
    'student-name': 'Name',
    'answer-time': 'Time',
    'selected-answer': 'Answer',
    restart: 'Start Again',
  },
  vote: {
    appName: 'Poll',
    start: 'Create poll',
    restart: 'Restart',
    over: 'End poll',
    submit: 'Submit',
    change: 'Change',
    'input-tip': 'What is your poll question?',
    'item-tip': 'Option',
    'single-sel': 'Single',
    'mul-sel': 'Multi-select',
  },
  begin_class: 'Begin class',
  edu_error: {
    '600000': 'Failed to join the classroom',
    '600001': 'Failed to join the classroom',
    '600002': 'Failed to validate extension, upload',
    '600003': 'Failed to upload: file format not supported',
    '600004': 'Failed to upload file to storage',
    '600005': 'Failed to upload file',
    '600006': 'Whiteboard not available',
    '600007': 'Whiteboard not available',
    '600008': 'Whiteboard not available',
    '600009': 'Failed to close whiteboard',
    '600010': 'Whiteboard not available',
    '600011': 'Whiteboard not available',
    '600012': 'Unsupported file format',
    '600013': 'Classroom not available',
    '600014': 'Failed to kick out',
    '600015': 'Local user information not obtained',
    '600016': 'Failed to get off the podium',
    '600017': 'Failed to reject hand up',
    '600018': 'Failed cancel hand up',
    '600019': 'Failed to start carousel ',
    '600020': 'Failed to stop carousel',
    '600021': 'Failed to mute',
    '600022': 'Failed to close widget',
    '600023': 'Failed to accept hand up',
    '600024': 'Failed to hand up',
    '600025': 'Failed to close widget',
    '600026': 'Data error',
    '600027': 'Failed to send reward',
    '600028': 'Failed to enable video',
    '600029': 'Failed to disable video',
    '600030': 'Failed to toggle video',
    '600031': 'Failed to enable audio',
    '600032': 'Failed to disable audio',
    '600033': 'Failed to toggle audio',
    '600034': 'Failed to load whiteboard',
    '600035': 'Failed to start recording',
    '600036': 'Failed to stop recording',
    '600037': 'Failed to join RTC',
    '600038': 'Failed to leave RTC',
    '600039': 'Failed to load whiteboard',
    '600040': 'Failed to leave whiteboard',
    '600041': 'Invalid to classroom state',
    '600042': 'Invalid to RTC state',
    '600043': 'Invalid to whiteboard state',
    '600044': 'Failed to leave the classroom',
    '600045': 'RTE uninitialized',
    '600046': 'Failed to hand up',
    '600047': 'Whitboard unavailable',
    '600048': 'Failed to get history chat message',
    '600049': 'Failed to get history chat message',
    '600050': 'Failed to get conversation list',
    '600051': 'Failed to send message',
    '600052': 'Failed to send message',
    '600053': 'Failed to mute users',
    '600054': 'Failed to unmute users',
    '600055': 'Device manager not initialized',
    '600056': 'Invalid students number',
    '600057': 'Failed to delete cloud resource',
    '600058': 'Failed to load cloud resources',
    '600059': 'Failed to update classroom state',
    '600060': 'Failed to start screen share',
    '600061': 'Failed to stop screen share',
    '600062': 'Failed to update local device state',
    '600063': 'Failed to update remote device state',
    '600064': 'Failed to upload file to cloud resource',
    '600065': 'Failed to update ExtApp properties',
    '600066': 'Failed to update ExtApp properties',
    '600067': 'Failed to convert cloud resource',
    '600068': 'The resource is converting',
    '600069': 'Failed to get all students off the podium',
    '600070': 'Failed to update Whiteboard state',
    '600071': 'Classroom state not initialized',
    '600072': 'Whiteboard connection timeout',
    '600073': 'Failed to report information',
    '600074': 'The resource is already opened',
    '600077': 'Failed to get upload checkpoint',
  },
  edu_serv_error: {
    '20400200': 'UserUuid is required!',
    '20400300': 'Stream is required!',
    '20401000': 'User token invalid!',
    '20401001': 'Role cannot join room!',
    '20403001': 'This role is full in the room!',
    '20403002': 'Room is full!',
    '20404000': 'Process not exist!',
    '20404100': 'Room not exist!',
    '20410101': 'Sequence is obsolete!',
    '20404200': 'User not exist!',
    '20404300': 'Stream not exist!',
    '20404400': 'Room template not exist!',
    '20409000': 'Process conflict!',
    '20409100': 'Room conflict!',
    '20409300': 'Stream uuid conflict!',
    '20410100': 'Room is end!',
    '20410200': 'User not online!',
    '20500300': 'Create stream failed!',
    '20500001': 'Generate token failed!',
    '30403100': 'You cannot join room.',
    '30400420': 'Please set whiteboard token in Agora console.',
    '30403200': 'You cannot send chat message.',
    '30404200': 'The teacher is not in the room.',
    '30409100': 'Session is started.',
    '30409101': 'Session is ended.',
    '30409102': 'Screen has shared.',
    '30409103': 'Screen has not shared.',
    '30409104': 'roomType conflicts.',
    '30409410': 'Record is not started.',
    '30409411': 'Record is running.',
    '30400412': 'Param "url" or "rootUrl" is required in web mode.',
    '30500420': 'Whiteboard failed to create room.',
    '30409440': 'Reward reached room limit.',
    '30409430': 'Private speech conflict.',
    '30404430': 'Private speech not found.',
    '30404460': 'process not found.',
    '30404461': 'progress not found.',
    '30409460': 'progress conflict.',
    '30404462': 'accept not found.',
    '30410460': 'process unable.',
    '30429460': 'progress reached max wait.',
    '30429461': 'accept reached max count.',
  },
};
