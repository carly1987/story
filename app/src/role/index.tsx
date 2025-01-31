import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuPane from '../layout/MenuPane';
import RootPane from '../layout/RootPane';
import MainPane from '../layout/MainPane';
import Menu from './Menu';

export default function RolePage() {
  const { name } = useParams();
  return (
    // @ts-ignore
    <RootPane>
      <MenuPane>
        <Menu name={name} dataSource={[]} />
      </MenuPane>
      <MainPane>
        <Box component="form">
        <Typography variant="h6" gutterBottom>
          基础信息
        </Typography>
        <TextField label="中文名" name="name" variant="standard" sx={[{ m: 2 }]} />
        <TextField label="外文名" name="ename" variant="standard" sx={[{ m: 2 }]} />
        <TextField label="网名" name="wname" variant="standard" sx={[{ m: 2 }]} />
        <TextField label="字" name="zname" variant="standard" sx={[{ m: 2 }]} />
        <TextField label="号" name="hname" variant="standard" sx={[{ m: 2 }]} />
        <TextField label="他人称" name="tname" fullWidth variant="standard" sx={[{ m: 2 }]} />
        <TextField label="自称" name="sname" fullWidth variant="standard" sx={[{ m: 2 }]} />

        <TextField label="年龄" name="age" variant="standard" sx={[{ m: 2 }]} />
        <TextField label="生日" name="birth" variant="standard" sx={[{ m: 2 }]} />
        <TextField label="性别" name="sex" variant="standard" sx={[{ m: 2 }]} />
        <TextField label="身高" name="height" variant="standard" sx={[{ m: 2 }]} />
        <TextField label="体重" name="weight" variant="standard" sx={[{ m: 2 }]} />
        <TextField label="星座" name="star" variant="standard" sx={[{ m: 2 }]} />
        <TextField label="血型" name="tblood" variant="standard" sx={[{ m: 2 }]} />
        <TextField label="血统" name="blood" variant="standard" sx={[{ m: 2 }]} />
        <TextField label="类型" name="trole" variant="standard" sx={[{ m: 2 }]} />

        <Typography variant="h6" gutterBottom>
          外表信息
        </Typography>
        <TextField label="身材" name="body" fullWidth variant="standard" sx={[{ m: 2 }]} />
        <TextField label="肤色" name="cface" fullWidth variant="standard" sx={[{ m: 2 }]} />
        <TextField label="头发" name="hair" fullWidth variant="standard" sx={[{ m: 2 }]} />
        <TextField label="眼睛" name="eye" fullWidth variant="standard" sx={[{ m: 2 }]} />
        <TextField label="手指" name="finger" fullWidth variant="standard" sx={[{ m: 2 }]} />
        <TextField label="耳朵" name="ear" fullWidth variant="standard" sx={[{ m: 2 }]} />
        <TextField label="嘴巴" name="mouth" fullWidth variant="standard" sx={[{ m: 2 }]} />
        <TextField label="鼻子" name="nose" fullWidth variant="standard" sx={[{ m: 2 }]} />
        <TextField label="身体特征" name="tbody" fullWidth variant="standard" sx={[{ m: 2 }]} />
        <TextField label="衣着特征" name="cloth" fullWidth variant="standard" sx={[{ m: 2 }]} />

        <Typography variant="h6" gutterBottom>
          社会环境
        </Typography>
        <TextField label="国籍" name="country" variant="standard" sx={[{ m: 2 }]} />
        <TextField label="民族" name="nation" variant="standard" sx={[{ m: 2 }]} />
        <TextField label="宗教" name="religion" variant="standard" sx={[{ m: 2 }]} />
        <TextField label="党派" name="group" variant="standard" sx={[{ m: 2 }]} />
        <TextField label="出身背景" name="fb" fullWidth variant="standard" sx={[{ m: 2 }]} />
        <TextField label="身份/职业" name="job" fullWidth variant="standard" sx={[{ m: 2 }]} />
        <TextField label="社会等级" name="lsocial" fullWidth variant="standard" sx={[{ m: 2 }]} />
        <TextField label="经济情况" name="money" fullWidth variant="standard" sx={[{ m: 2 }]} multiline maxRows={5} />
        <TextField label="出生地" name="pbirth" fullWidth variant="standard" sx={[{ m: 2 }]} multiline maxRows={5} />
        <TextField label="住所" name="home" fullWidth variant="standard" sx={[{ m: 2 }]} multiline maxRows={5} />
        <TextField label="教育" name="education" fullWidth variant="standard" sx={[{ m: 2 }]} multiline maxRows={5} />
        <TextField label="工作经历" name="hjob" fullWidth variant="standard" sx={[{ m: 2 }]} multiline maxRows={5} />
        <TextField label="家庭关系" name="family" fullWidth variant="standard" sx={[{ m: 2 }]} multiline maxRows={5} />
        <TextField label="伴侣" name="partner" variant="standard" sx={[{ m: 2 }]} />
        <TextField label="情人" name="lover" variant="standard" sx={[{ m: 2 }]} />
        <TextField label="好友" name="friend" variant="standard" sx={[{ m: 2 }]} />
        <TextField label="偶像" name="idol" variant="standard" sx={[{ m: 2 }]} />
        <TextField label="尊敬的人" name="respect" variant="standard" sx={[{ m: 2 }]} />
        <TextField label="青梅竹马" name="cs" variant="standard" sx={[{ m: 2 }]} />
        <TextField label="得不到的人" name="unget" variant="standard" sx={[{ m: 2 }]} />
        <TextField label="宿敌" name="enemy" variant="standard" sx={[{ m: 2 }]} />
        <TextField label="对手" name="rival" variant="standard" sx={[{ m: 2 }]} />
        <TextField label="他人评价" name="eother" fullWidth variant="standard" sx={[{ m: 2 }]} multiline maxRows={5} />

        <Typography variant="h6" gutterBottom>
          性格信息
        </Typography>
        <TextField label="正面性格" name="zpersonal" fullWidth variant="standard" sx={[{ m: 2 }]} multiline maxRows={5} />
        <TextField label="反面性格" name="fpersonal" fullWidth variant="standard" sx={[{ m: 2 }]} multiline maxRows={5} />
        <TextField label="习惯小动作" name="scation" fullWidth variant="standard" sx={[{ m: 2 }]} />
        <TextField label="口头禅" name="rwords" fullWidth variant="standard" sx={[{ m: 2 }]} />
        <TextField label="技能/优势" name="skill" fullWidth variant="standard" sx={[{ m: 2 }]} />
        <TextField label="喜好/怪癖" name="like" fullWidth variant="standard" sx={[{ m: 2 }]} />
        <TextField label="讨厌" name="nolike" fullWidth variant="standard" sx={[{ m: 2 }]} />
        <TextField label="害怕" name="fear" fullWidth variant="standard" sx={[{ m: 2 }]} />
        <TextField label="憎恨" name="hate" fullWidth variant="standard" sx={[{ m: 2 }]} />
        <TextField label="梦想" name="dream" fullWidth variant="standard" sx={[{ m: 2 }]} />
        <TextField label="爱好" name="hobby" fullWidth variant="standard" sx={[{ m: 2 }]} />
        <TextField label="习惯表情" name="tface" fullWidth variant="standard" sx={[{ m: 2 }]} />
        <TextField label="性格转变" name="cpersonal" fullWidth variant="standard" sx={[{ m: 2 }]} />
        <TextField label="人物反差" name="gap" fullWidth variant="standard" sx={[{ m: 2 }]} />

        <Typography variant="h6" gutterBottom>
          人生经历
        </Typography>
        <TextField label="正面性格" name="zpersonal" fullWidth variant="standard" sx={[{ m: 2 }]} multiline maxRows={5} />
        <TextField label="反面性格" name="fpersonal" fullWidth variant="standard" sx={[{ m: 2 }]} multiline maxRows={5} />
        <TextField label="习惯小动作" name="scation" fullWidth variant="standard" sx={[{ m: 2 }]} />
        </Box>
      </MainPane>
    </RootPane>
    
  );
}
