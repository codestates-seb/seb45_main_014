import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import images from '../assets/images/Images';

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: fixed;
  bottom: 0;
  max-height: 230px;
  background-color: #debe8f;
  color: white;
`;

const FooterContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

const Support = styled.ul`
  display: flex;
  font-weight: 600;
`;
const SupItem = styled.li`
  padding: 0 10px 0 10px;
  border-right: 2px solid white;
  max-height: 20px;
  line-height: 20px;
  &:last-child {
    border: none;
  }
`;

const MemberWrapper = styled.div`
  width: 230px;
  padding-top: 24px;
  font-weight: 700;
  text-align: center;
`;

const MemberBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Member = styled.li`
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  padding-bottom: 5px;
  &:first-child {
    padding-top: 7px;
  }
`;

const Logo = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  right: 0;
  padding-right: 16px;
  padding-bottom: 10px;
  font-size: 12px;
  font-family: AritaSans;
  font-weight: 600;
`;

const Footer = () => {
  const supportItem = ['회사소개', '공지사항', '이용약관', '개인정보 처리방침'];
  const frontMember = [
    { name: '양새결', url: 'https://github.com/YangSaekyul' },
    { name: '송상현', url: 'https://github.com/nuyhv' },
    { name: '김종호', url: 'https://github.com/JongHoSke' },
  ];
  const backMember = [
    { name: '김성현', url: 'https://github.com/tsulocalize' },
    { name: '김하민', url: 'https://github.com/kimhaming' },
    { name: '박보승', url: 'https://github.com/Alluringstar' },
  ];

  return (
    <FooterContainer>
      <FooterContent>
        <Support>
          {supportItem.map((item, idx) => (
            <SupItem className="cursor-pointer" key={idx}>
              {item}
            </SupItem>
          ))}
        </Support>
        <MemberWrapper className="text-lg">
          DEVS
          <MemberBox>
            <ul className="text-sm">
              FRONT-END
              {frontMember.map((item, idx) => (
                <Member key={idx}>
                  <Link to={item.url} className="flex justify-center">
                    {item.name}
                    <img
                      src={images.githublogo}
                      alt="github logo"
                      width="20"
                      className="ml-1"
                    />
                  </Link>
                </Member>
              ))}
            </ul>
            <ul className="text-sm">
              BACK-END
              {backMember.map((item, idx) => (
                <Member key={idx}>
                  <Link to={item.url} className="flex justify-center">
                    {item.name}
                    <img
                      src={images.githublogo}
                      alt="github logo"
                      width="20"
                      className="ml-1"
                    />
                  </Link>
                </Member>
              ))}
            </ul>
          </MemberBox>
        </MemberWrapper>
        <Logo to="/">
          <img src={images.mainlogo} alt="main logo" width="70" />
          BBANG ORDER
        </Logo>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
