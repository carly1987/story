import Select from '../components/Select';
import { TextInput } from '../components/Input';
import * as Constants from '../constants';

export default function Basic({dataSource}: any) {
  return (
    <>
      <TextInput label="书名" name="name" defaultValue={dataSource?.name} />
      <TextInput label="主题" name="topic" defaultValue={dataSource?.topic} />
      <Select label="主题类型" name="topic" defaultValue={dataSource?.topic_type} dataSource={Constants.Topics_Type} />
      <TextInput label="谚语" name="topic_words" defaultValue={dataSource?.topic_words} />
      <TextInput label="最高目标" name="target" note="故事的主体事件=谁在干什么？" defaultValue={dataSource?.target} />
      <TextInput label="主要情节" name="plot" maxRows={5} defaultValue={dataSource?.plot} />
      <Select label="故事节奏" name="pacing" dataSource={Constants.Pacing} defaultValue={dataSource?.pacing} />
      <TextInput label="主要冲突" name="major_conflict" defaultValue={dataSource?.major_conflict} />
      <TextInput label="独特卖点" name="usp" defaultValue={dataSource?.usp} />
      <TextInput label="核心梗=基础故事模型" name="core_gag" defaultValue={dataSource?.core_gag} />
      <TextInput label="主题陈述" name="topic_intro" note="主要情节+独特卖点+主题" defaultValue={dataSource?.topic_intro} />
      <TextInput label="传播性" name="communicability" defaultValue={dataSource?.communicability} />
      <TextInput label="互动性" name="interactivity" defaultValue={dataSource?.interactivity} />
      <TextInput label="时效性" name="timeliness" defaultValue={dataSource?.timeliness} />
      <TextInput label="共创性" name="creativity" defaultValue={dataSource?.creativity} />
      <TextInput label="ip性" name="ip" defaultValue={dataSource?.ip} />
    </>
  );
}